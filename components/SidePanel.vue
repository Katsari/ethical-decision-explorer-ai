<template>
  <div
    v-if="selectedNode"
    :class="[
      'fixed inset-y-0 right-0 w-full sm:w-[28rem] md:w-[36rem] bg-gray-900/90 backdrop-blur-sm border-l border-gray-800 h-full flex flex-col z-50 overflow-hidden',
      isVisible ? 'animate-slide-in' : 'animate-slide-out',
    ]"
  >
    <!-- Mobile Close Button -->
    <div class="flex justify-end pr-2 pt-2">
      <UButton
        icon="i-heroicons-x-mark"
        color="gray"
        variant="ghost"
        @click="handleClose"
        class="mr-2 mt-2"
      />
    </div>

    <div class="flex-1 overflow-y-auto p-4 sm:p-6">
      <template v-if="selectedNode">
        <h2 class="text-xl font-semibold mb-4 text-gray-100">
          {{ selectedNode.label }}
        </h2>

        <p class="text-gray-400 mb-6">
          {{ selectedNode.description }}
        </p>

        <template v-if="selectedNode.id === 'root'">
          <!-- Root Node Content -->
          <div class="space-y-6">
            <h3 class="font-medium text-gray-100 text-lg">Available Choices</h3>
            <div
              v-for="(choice, index) in (selectedNode!.choices as Choice[])"
              :key="index"
              class="bg-gray-800/50 rounded-lg p-4"
            >
              <div class="text-gray-100">{{ choice.text }}</div>
            </div>
          </div>
        </template>

        <template
          v-else-if="
            selectedNode.id !== 'root' &&
            selectedNode.choices &&
            selectedNode.choices.length > 0
          "
        >
          <!-- Decision Node Content -->
          <div class="space-y-6">
            <h3
              class="font-medium text-gray-100 text-lg"
              v-if="selectedNode.label !== 'Start Your Ethical Journey'"
            >
              Ethical Analysis
            </h3>
            <div
              v-for="(choice, index) in (selectedNode!.choices as Choice[])"
              :key="index"
              class="bg-gray-800/50 rounded-lg p-4 space-y-4"
            >
              <!-- Choice Text -->
              <div class="text-gray-100 font-medium">{{ choice.text }}</div>

              <!-- Framework Analysis -->
              <div v-if="choice.frameworkWeights" class="space-y-4">
                <!-- Maximize Expected Choice-Worthiness -->
                <div class="space-y-2">
                  <h4 class="text-sm font-medium text-gray-400">
                    Maximize Expected Choice-Worthiness
                  </h4>
                  <div class="flex items-center gap-2">
                    <UBadge
                      :color="
                        getChoiceWorthinessColor(
                          choice.expectedChoiceWorthiness
                        )
                      "
                      variant="solid"
                      size="lg"
                    >
                      {{ choice.expectedChoiceWorthiness.toFixed(1) }}
                    </UBadge>
                  </div>
                </div>

                <!-- Framework Credences -->
                <div class="space-y-2">
                  <h4 class="text-sm font-medium text-gray-400">
                    Framework Analysis
                  </h4>
                  <div class="space-y-3">
                    <!-- Utilitarianism -->
                    <div
                      v-if="choice.frameworkWeights.utilitarianism"
                      class="bg-yellow-500/10 p-3 rounded-lg"
                    >
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-yellow-400 font-medium"
                          >Utilitarianism</span
                        >
                        <div class="flex gap-2">
                          <UBadge color="yellow" variant="solid"
                            >Credence:
                            {{
                              choice.frameworkWeights.utilitarianism.credence
                            }}%</UBadge
                          >
                          <UBadge color="yellow" variant="outline"
                            >Worth:
                            {{
                              choice.frameworkWeights.utilitarianism
                                .choiceWorthiness
                            }}</UBadge
                          >
                        </div>
                      </div>
                      <p class="text-sm text-gray-400">
                        {{ choice.frameworkWeights.utilitarianism.explanation }}
                      </p>
                    </div>

                    <!-- Deontology -->
                    <div
                      v-if="choice.frameworkWeights.deontology"
                      class="bg-blue-500/10 p-3 rounded-lg"
                    >
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-blue-400 font-medium"
                          >Deontology</span
                        >
                        <div class="flex gap-2">
                          <UBadge color="blue" variant="solid"
                            >Credence:
                            {{
                              choice.frameworkWeights.deontology.credence
                            }}%</UBadge
                          >
                          <UBadge color="blue" variant="outline"
                            >Worth:
                            {{
                              choice.frameworkWeights.deontology
                                .choiceWorthiness
                            }}</UBadge
                          >
                        </div>
                      </div>
                      <p class="text-sm text-gray-400">
                        {{ choice.frameworkWeights.deontology.explanation }}
                      </p>
                    </div>

                    <!-- Virtue Ethics -->
                    <div
                      v-if="choice.frameworkWeights.virtueEthics"
                      class="bg-green-500/10 p-3 rounded-lg"
                    >
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-green-400 font-medium"
                          >Virtue Ethics</span
                        >
                        <div class="flex gap-2">
                          <UBadge color="green" variant="solid"
                            >Credence:
                            {{
                              choice.frameworkWeights.virtueEthics.credence
                            }}%</UBadge
                          >
                          <UBadge color="green" variant="outline"
                            >Worth:
                            {{
                              choice.frameworkWeights.virtueEthics
                                .choiceWorthiness
                            }}</UBadge
                          >
                        </div>
                      </div>
                      <p class="text-sm text-gray-400">
                        {{ choice.frameworkWeights.virtueEthics.explanation }}
                      </p>
                    </div>

                    <!-- Contractualism -->
                    <div
                      v-if="choice.frameworkWeights.contractualism"
                      class="bg-purple-500/10 p-3 rounded-lg"
                    >
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-purple-400 font-medium"
                          >Contractualism</span
                        >
                        <div class="flex gap-2">
                          <UBadge color="purple" variant="solid"
                            >Credence:
                            {{
                              choice.frameworkWeights.contractualism.credence
                            }}%</UBadge
                          >
                          <UBadge color="purple" variant="outline"
                            >Worth:
                            {{
                              choice.frameworkWeights.contractualism
                                .choiceWorthiness
                            }}</UBadge
                          >
                        </div>
                      </div>
                      <p class="text-sm text-gray-400">
                        {{ choice.frameworkWeights.contractualism.explanation }}
                      </p>
                    </div>

                    <!-- Care Ethics -->
                    <div
                      v-if="choice.frameworkWeights.careEthics"
                      class="bg-pink-500/10 p-3 rounded-lg"
                    >
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-pink-400 font-medium"
                          >Care Ethics</span
                        >
                        <div class="flex gap-2">
                          <UBadge color="pink" variant="solid"
                            >Credence:
                            {{
                              choice.frameworkWeights.careEthics.credence
                            }}%</UBadge
                          >
                          <UBadge color="pink" variant="outline"
                            >Worth:
                            {{
                              choice.frameworkWeights.careEthics
                                .choiceWorthiness
                            }}</UBadge
                          >
                        </div>
                      </div>
                      <p class="text-sm text-gray-400">
                        {{ choice.frameworkWeights.careEthics.explanation }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Moral Parliament Analysis -->
                <div v-if="choice.moralParliament" class="space-y-3">
                  <h4 class="text-sm font-medium text-gray-400">
                    Stakeholder Analysis
                  </h4>
                  <div class="bg-gray-800/50 p-3 rounded-lg space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-300">Consensus Score</span>
                      <UBadge
                        :color="
                          getConsensusColor(
                            choice.moralParliament.consensusScore
                          )
                        "
                        variant="solid"
                      >
                        {{ choice.moralParliament.consensusScore }}/10
                      </UBadge>
                    </div>
                    <p class="text-sm text-gray-400">
                      {{ choice.moralParliament.summary }}
                    </p>

                    <!-- Stakeholder Votes -->
                    <div class="space-y-2 mt-3">
                      <h5 class="text-xs font-medium text-gray-500">
                        Stakeholder Perspectives
                      </h5>
                      <div
                        v-for="vote in choice.moralParliament.stakeholderVotes"
                        :key="vote.stakeholder"
                        class="bg-gray-900/50 p-2 rounded"
                      >
                        <div class="flex justify-between items-center mb-1">
                          <span class="text-sm text-gray-300">{{
                            vote.stakeholder
                          }}</span>
                          <UBadge
                            :color="
                              vote.support >= 7
                                ? 'green'
                                : vote.support >= 4
                                ? 'yellow'
                                : 'red'
                            "
                          >
                            {{ vote.support }}/10
                          </UBadge>
                        </div>
                        <div class="text-xs text-gray-500">
                          {{ vote.perspective }}
                        </div>
                        <div class="text-xs text-gray-400 mt-1">
                          {{ vote.reasoning }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ethical Analysis -->
              <div v-if="choice.analysis" class="space-y-2">
                <h4 class="text-sm font-medium text-gray-400">Analysis</h4>
                <p class="text-sm text-gray-300">{{ choice.analysis }}</p>
              </div>
            </div>
          </div>
        </template>

        <template
          v-else-if="selectedNode!.id !== 'root' && selectedNode!.choices?.length === 0 && selectedNode!.ethicalImplications"
        >
          <!-- Consequence Node Content -->
          <div class="space-y-4 mt-6">
            <h3 class="font-medium text-gray-100 text-lg">
              Ethical Implications
            </h3>
            <div class="bg-gray-800/50 rounded-lg p-4">
              <p class="text-sm text-gray-300">
                {{ selectedNode!.ethicalImplications }}
              </p>
            </div>
          </div>
        </template>
      </template>
      <p v-else class="text-gray-400 text-center mt-8">
        Select a node to view details
      </p>
    </div>
  </div>
</template>

<style>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

.animate-slide-out {
  animation: slide-out 0.3s ease-out;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Choice, DecisionNode as SelectedNode } from '~/types'

const emit = defineEmits<{
  close: []
}>()

const { getChoiceWorthinessColor, getConsensusColor } = useEthicalScores()

const props = defineProps<{
  selectedNode: SelectedNode | null
}>()

const isVisible = ref(true)

function handleClose() {
  isVisible.value = false
  // Wait for animation to complete before emitting close
  setTimeout(() => emit('close'), 300)
}

// Reset visibility when node changes
watch(
  () => props.selectedNode,
  () => {
    isVisible.value = true
  }
)
</script>
