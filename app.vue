<template>
  <div class="h-screen flex flex-col bg-gray-950">
    <ApiKeyForm v-if="!apiKey" @submit="handleApiKeySubmit" />

    <QuestionInterface :is-loading="isLoading" @submit="handleQuestionSubmit" />

    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1">
        <ClientOnly>
          <FlowCanvas
            :nodes="nodes"
            :edges="edges"
            @node-click="handleNodeClick"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Edge, Node } from '@vue-flow/core'
import { computed } from 'vue'
import { generateDecisionTree } from '~/utils/gemini'

const apiKey = ref<string | null>(null)
const isLoading = ref(false)
const path = ref<string[]>(['Start'])
const selectedNode = ref<any>(null)
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640) // sm breakpoint is 640px
const showSidePanel = ref(import.meta.client ? !isMobile.value : true)

const edges = ref<Edge[]>([])
const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'decision',
    position: { x: 250, y: 0 },
    data: {
      label: 'Start Your Ethical Journey',
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

const handleApiKeySubmit = (key: string) => {
  apiKey.value = key
  useToast().add({
    title: 'API Key Set',
    description: 'You can now start generating ethical decision trees.',
  })
}

const handleQuestionSubmit = async (question: string) => {
  if (!apiKey.value) {
    useToast().add({
      title: 'API Key Required',
      description: 'Please enter your Gemini API key first.',
      color: 'red',
    })
    return
  }

  isLoading.value = true
  try {
    const result = await generateDecisionTree(question, apiKey.value)

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

      return {
        id: node.id,
        type: 'decision',
        position: {
          x: (position - width / 2) * 500 + 400,
          y: level * 450,
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
    path.value = ['Start']

    useToast().add({
      title: 'Decision Tree Generated',
      description: 'Explore the ethical implications by clicking on the nodes.',
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
  path.value = [...path.value, node.data.label]
  showSidePanel.value = true
}
</script>
