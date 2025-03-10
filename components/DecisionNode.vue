<template>
  <div
    :class="[
      'px-4 py-2 rounded-lg shadow-sm transition-all duration-200',
      nodeClasses.base,
      selected ? nodeClasses.selected : '',
    ]"
  >
    <div class="w-96">
      <div class="text-sm font-medium text-gray-100 mb-2">{{ data.label }}</div>
      <div class="text-xs text-gray-400 mb-3">{{ data.description }}</div>

      <!-- Root node -->
      <template v-if="data.id === 'root' && data.choices">
        <div class="space-y-4">
          <!-- Ethical theory credences section -->
          <div v-if="data.frameworkCredences" class="space-y-2">
            <h4 class="text-xs font-medium text-gray-400">
              Ethical Theory Credences
            </h4>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="(credence, name) in data.frameworkCredences"
                :key="name"
                :color="getFrameworkColor(name)"
                variant="solid"
                class="text-xs"
              >
                {{ formatFrameworkName(name) }}: {{ credence }}%
              </UBadge>
            </div>
          </div>

          <!-- Available choices section -->
          <div class="space-y-2">
            <h4 class="text-xs font-medium text-gray-400">Available Choices</h4>
            <div class="space-y-3">
              <div
                v-for="choice in data.choices"
                :key="choice.text"
                class="bg-gray-800/50 p-3 rounded"
              >
                <div class="text-sm text-gray-200">{{ choice.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Decision node with choices -->
      <template v-else-if="data.choices && data.choices.length > 0">
        <div class="space-y-3">
          <div
            v-for="choice in data.choices"
            :key="choice.text"
            class="bg-gray-800/50 p-3 rounded space-y-3"
          >
            <div class="text-sm text-gray-200">{{ choice.text }}</div>

            <!-- Framework analysis -->
            <template v-if="choice.frameworkWeights && data.id !== 'root'">
              <div class="space-y-3">
                <!-- Maximize Expected Choice-Worthiness -->
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-400"
                    >Expected Choice-Worthiness:</span
                  >
                  <UBadge
                    :color="
                      getChoiceWorthinessColor(choice.expectedChoiceWorthiness)
                    "
                    variant="solid"
                    size="sm"
                  >
                    {{ choice.expectedChoiceWorthiness.toFixed(1) }}
                  </UBadge>
                </div>

                <!-- Framework credences -->
                <div class="flex flex-wrap gap-1.5">
                  <span class="text-sm text-gray-400">
                    Choice-Worthiness by ethical framework:
                  </span>
                  <UBadge
                    v-if="choice.frameworkWeights.utilitarianism"
                    color="yellow"
                    variant="outline"
                    size="sm"
                    class="bg-yellow-500/10"
                    :title="choice.frameworkWeights.utilitarianism.explanation"
                  >
                    Utilitarianism:
                    {{
                      choice.frameworkWeights.utilitarianism.choiceWorthiness
                    }}
                  </UBadge>
                  <UBadge
                    v-if="choice.frameworkWeights.deontology"
                    color="blue"
                    variant="outline"
                    size="sm"
                    class="bg-blue-500/10"
                    :title="choice.frameworkWeights.deontology.explanation"
                  >
                    Deontology:
                    {{ choice.frameworkWeights.deontology.choiceWorthiness }}
                  </UBadge>
                  <UBadge
                    v-if="choice.frameworkWeights.virtueEthics"
                    color="green"
                    variant="outline"
                    size="sm"
                    class="bg-green-500/10"
                    :title="choice.frameworkWeights.virtueEthics.explanation"
                  >
                    Virtue Ethics:
                    {{ choice.frameworkWeights.virtueEthics.choiceWorthiness }}
                  </UBadge>
                  <UBadge
                    v-if="choice.frameworkWeights.contractualism"
                    color="purple"
                    variant="outline"
                    size="sm"
                    class="bg-purple-500/10"
                    :title="choice.frameworkWeights.contractualism.explanation"
                  >
                    Contractualism:
                    {{
                      choice.frameworkWeights.contractualism.choiceWorthiness
                    }}
                  </UBadge>
                  <UBadge
                    v-if="choice.frameworkWeights.careEthics"
                    color="pink"
                    variant="outline"
                    size="sm"
                    class="bg-pink-500/10"
                    :title="choice.frameworkWeights.careEthics.explanation"
                  >
                    Care Ethics:
                    {{ choice.frameworkWeights.careEthics.choiceWorthiness }}
                  </UBadge>
                </div>

                <!-- Moral Parliament summary -->
                <div
                  v-if="choice.moralParliament"
                  class="text-xs text-gray-400"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-sm text-gray-400"
                      >Stakeholder Consensus:</span
                    >
                    <UBadge
                      :color="
                        getConsensusColor(choice.moralParliament.consensusScore)
                      "
                      variant="solid"
                      size="sm"
                    >
                      {{ choice.moralParliament.consensusScore }}/10
                    </UBadge>
                  </div>
                  <div>{{ choice.moralParliament.summary }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>

      <!-- Consequence node -->
      <template
        v-else-if="data.choices?.length === 0 && data.ethicalImplications"
      >
        <div class="space-y-3">
          <h4 class="text-xs font-medium text-gray-400">
            Ethical Implications
          </h4>
          <div class="bg-gray-800/50 rounded p-3">
            <p class="text-xs text-gray-300">{{ data.ethicalImplications }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import type { DecisionNode } from '~/types'

const props = defineProps<
  NodeProps & {
    data: DecisionNode
    selected: boolean
  }
>()

const {
  getFrameworkColor,
  formatFrameworkName,
  getChoiceWorthinessColor,
  getConsensusColor,
} = useEthicalScores()

const nodeClasses = {
  base: 'bg-gray-800/50',
  selected: 'ring-2 ring-primary',
} as const
</script>
