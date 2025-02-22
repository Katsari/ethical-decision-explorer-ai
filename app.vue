<template>
  <div class="h-screen flex flex-col bg-gray-950">
    <div
      class="flex flex-col md:flex-row items-center space-x-4 gap-4 py-3 px-4 bg-gray-900"
    >
      <!-- Logo + Name + GitHub -->
      <div
        class="flex items-center w-full md:w-auto justify-between md:justify-start self-start"
      >
        <div class="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Ethical Decision Explorer Logo"
            class="h-10 w-10"
          />
          <h1 class="text-white text-md font-semibold whitespace-nowrap">
            Ethical Decision Explorer
          </h1>
        </div>

        <!-- GitHub icon -->
        <a
          href="https://github.com/Katsari/ethical-decision-explorer-ai"
          target="_blank"
          rel="noopener"
          class="text-gray-400 hover:text-white transition-colors flex-shrink-0 md:hidden"
        >
          <UIcon name="i-line-md-github-loop" class="h-6 w-6" />
        </a>
      </div>

      <!-- Question Interface -->
      <div class="w-full flex-1 flex items-center gap-4">
        <QuestionInterface
          :is-loading="isLoading"
          @submit="handleQuestionSubmit"
          class="flex-1"
        />

        <!-- GitHub icon on desktop -->
        <a
          href="https://github.com/Katsari/ethical-decision-explorer-ai"
          target="_blank"
          rel="noopener"
          class="hidden md:block ml-8 text-gray-400 hover:text-white transition-colors flex-shrink-0 self-start"
        >
          <UIcon name="i-line-md-github-loop" class="h-6 w-6" />
        </a>
      </div>
    </div>

    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 overflow-hidden">
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

        <SidePanel
          v-if="showSidePanel"
          :selected-node="selectedNode"
          @close="showSidePanel = false"
        />

        <UNotifications />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

import { useVueFlow, type Edge, type Node } from '@vue-flow/core'
import { generateDecisionTree } from '~/utils/gemini'

const { fitView } = useVueFlow()

const isLoading = ref(false)
const selectedNode = ref<any>(null)
const showSidePanel = ref(false)

const edges = ref<Edge[]>([])
const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'decision',
    position: { x: 0, y: 0 },
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
    timeout: 9000,
  })

  try {
    const result = await generateDecisionTree(question)

    // Create a map to store the level of each node in the tree
    const nodeLevels = new Map()

    // Recursive function to process nodes and assign levels
    const processNode = (nodeId: string, level: number) => {
      nodeLevels.set(nodeId, level)
      const node = result.nodes.find((n) => n.id === nodeId)
      if (node) {
        // Process each choice, incrementing the level for child nodes
        node.choices?.forEach((choice) => {
          if (!nodeLevels.has(choice.targetNodeId)) {
            processNode(choice.targetNodeId, level + 1)
          }
        })
      }
    }

    // Start processing from the root node at level 0
    processNode('root', 0)

    // Calculate the width (number of nodes) at each level
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

      const xOffset = (position - width / 2) * 500
      const yOffset = level * 450

      return {
        id: node.id,
        type: 'decision',
        position: {
          x: xOffset,
          y: yOffset,
        },
        data: {
          id: node.id,
          label: node.label,
          description: node.description,
          frameworkCredences: node.frameworkCredences,
          choices: node.choices,
          ethicalImplications: node.ethicalImplications,
        },
      }
    })

    const newEdges = result.edges.map((edge) => ({
      id: `${edge.source}-${edge.target}`,
      label: edge.label,
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
