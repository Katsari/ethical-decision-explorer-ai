<template>
  <div class="h-screen flex flex-col bg-gray-950">
    <QuestionInterface :is-loading="isLoading" @submit="handleQuestionSubmit" />

    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1">
        <ClientOnly>
          <FlowCanvas
            :nodes="nodes"
            :edges="edges"
            @node-click="handleNodeClick"
            @pane-click="handlePaneClick"
            @update:nodes="nodes = $event"
            @update:edges="edges = $event"
          />
        </ClientOnly>
      </div>

      <SidePanel
        v-if="showSidePanel"
        :selected-node="selectedNode"
        @close="showSidePanel = false"
      />

      <UNotifications />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Edge, Node } from '@vue-flow/core'
import { generateDecisionTree } from '~/utils/gemini'

const isLoading = ref(false)
const selectedNode = ref<any>(null)
const showSidePanel = ref(false)

const edges = ref<Edge[]>([])
const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'decision',
    position: { x: 250, y: 0 },
    data: {
      label: 'Start your ethical journey',
      description: '',
      choices: [
        {
          text: 'Begin by entering an ethical dilemma in the form above.',
          targetNodeId: '',
          frameworkWeights: null,
          analysis: null,
          expectedChoiceWorthiness: 0,
          moralParliament: null,
        },
      ],
    },
  },
])

const handleQuestionSubmit = async (question: string) => {
  isLoading.value = true
  useToast().add({
    title: 'Analyzing question',
    description: 'Please wait while we generate the analysis...',
    timeout: 6000,
    pauseTimeoutOnHover: false,
    color: 'bg-gray-900',
  })
  try {
    const result = await generateDecisionTree(question)

    // Create a map to store the level of each node
    const nodeLevels = new Map()
    const processNode = (nodeId: string, level: number) => {
      nodeLevels.set(nodeId, level)
      const node = result.nodes.find((n) => n.id === nodeId)
      if (node) {
        node.choices?.forEach((choice) => {
          if (!nodeLevels.has(choice.targetNodeId)) {
            processNode(choice.targetNodeId, level + 1)
          }
        })
      }
    }

    // Start with the root node
    processNode('root', 0)

    // Calculate the maximum nodes at any level
    const levelWidths = new Map()
    nodeLevels.forEach((level, nodeId) => {
      levelWidths.set(level, (levelWidths.get(level) || 0) + 1)
    })

    // Position nodes based on their level and position within level
    const levelPositions = new Map()
    const newNodes = result.nodes.map((node) => {
      const level = nodeLevels.get(node.id)
      const width = levelWidths.get(level)
      const position = levelPositions.get(level) || 0
      levelPositions.set(level, position + 1)

      // Calculate positions relative to window center
      const screenCenter =
        typeof window !== 'undefined' ? window.innerWidth / 4 : 0
      const xOffset = (position - width / 2) * 500
      const yOffset = level * 450

      return {
        id: node.id,
        type: 'decision',
        position: {
          x: screenCenter + xOffset,
          y: yOffset,
        },
        data: {
          id: node.id,
          label: node.label,
          description: node.description,
          choices: node.choices,
          ethicalImplications: node.ethicalImplications,
        },
      }
    })

    const newEdges = result.edges.map((edge) => ({
      id: `${edge.source}-${edge.target}`,
      type: 'smoothstep',
      animated: true,
      label: edge.label,
      labelStyle: { fontSize: 12 },
      style: { stroke: '#2563eb' },
      source: edge.source,
      target: edge.target,
    }))

    nodes.value = newNodes
    edges.value = newEdges

    useToast().add({
      title: 'Decision tree generated',
      description: 'Explore the ethical implications by clicking on the nodes.',
      timeout: 8000,
    })
  } catch (error) {
    console.error('Error generating decision tree:', error)
    useToast().add({
      title: 'Error',
      description: 'Failed to generate decision tree. Please try again.',
      color: 'red',
    })
  } finally {
    isLoading.value = false
  }
}

const handleNodeClick = (_: any, node: any) => {
  selectedNode.value = node.data
  showSidePanel.value = true
}

const handlePaneClick = () => {
  showSidePanel.value = false
}
</script>
