<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :default-viewport="defaultViewport"
    :node-types="nodeTypes"
    :min-zoom="0.1"
    :max-zoom="4"
    :default-edge-options="{
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#2563eb' },
    }"
    :fit-view-on-init="false"
    :node-dimensions-change="false"
    @node-click="onNodeClick"
    @pane-click="onPaneClick"
    class="vue-flow-dark bg-gray-900 w-full h-full"
  >
    <Background />
    <Controls />
  </VueFlow>
</template>

<script setup lang="ts">
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import type { MouseTouchEvent } from '@vue-flow/core'
import { VueFlow, type Edge, type Node } from '@vue-flow/core'
import type { Component } from 'vue'
import { computed } from 'vue'
import DecisionNode from './DecisionNode.vue'

import type { DecisionNode as DecisionNodeType } from '~/types'

type DecisionNodeData = DecisionNodeType
type CustomNode = Node<DecisionNodeData>

const props = defineProps<{
  nodes: CustomNode[]
  edges: Edge[]
}>()

const emit = defineEmits<{
  'node-click': [event: MouseTouchEvent, node: CustomNode]
  'pane-click': [event: MouseTouchEvent]
}>()

const nodeTypes: Record<string, Component> = {
  decision: DecisionNode,
}

const defaultViewport = computed(() => ({
  x: typeof window !== 'undefined' ? window.innerWidth / 4 : 0,
  y: 50,
  zoom: 1,
}))

const onNodeClick = ({
  event,
  node,
}: {
  event: MouseTouchEvent
  node: CustomNode
}) => {
  emit('node-click', event, node)
}

const onPaneClick = (event: MouseTouchEvent) => {
  emit('pane-click')
}
</script>
