<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :node-types="nodeTypes"
    :min-zoom="0.1"
    :max-zoom="4"
    :default-edge-options="{
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#2563eb' },
      labelStyle: { fontSize: 12 },
    }"
    @node-click="onNodeClick"
    @pane-click="onPaneClick"
    class="bg-gray-900 w-full h-full"
  >
    <Background />
    <Controls />
  </VueFlow>
</template>

<script setup lang="ts">
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import {
  useVueFlow,
  VueFlow,
  type Edge,
  type MouseTouchEvent,
} from '@vue-flow/core'
import type { Component } from 'vue'
import { computed, markRaw } from 'vue'
import DecisionNode from './DecisionNode.vue'
import type { DecisionNode as Node } from '~/types'

const { onInit, fitView, zoomTo, onNodesChange } = useVueFlow()

const props = defineProps<{
  nodes: Node[]
  edges: Edge[]
}>()

const emit = defineEmits<{
  'node-click': [event: MouseTouchEvent, node: Node]
  'pane-click': [event: MouseTouchEvent]
}>()

const nodeTypes: Record<string, Component> = {
  decision: markRaw(DecisionNode),
}

onInit((instance) => {
  fitView()
  zoomTo(0.9)
})

onNodesChange((changes) => {
  // if more than 2 nodes have changed, it means the tree was generated
  if (changes.length > 2) {
    fitView()
  }
})

const onNodeClick = ({
  event,
  node,
}: {
  event: MouseTouchEvent
  node: Node
}) => {
  emit('node-click', event, node)
}

const onPaneClick = (event: MouseTouchEvent) => {
  emit('pane-click', event)
}
</script>
