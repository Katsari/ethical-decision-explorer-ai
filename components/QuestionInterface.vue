<template>
  <form
    @submit="handleSubmit"
    class="p-6 border-b border-gray-800 bg-gray-900/90"
  >
    <div class="grid grid-cols-1 gap-4">
      <div class="w-full">
        <label
          for="question"
          class="text-sm font-medium text-gray-300 block mb-2"
        >
          Ethical Question
        </label>
        <div class="flex space-x-2">
          <UInput
            id="question"
            v-model="question"
            placeholder="Enter your ethical dilemma..."
            class="flex-1"
          />
          <UButton
            type="submit"
            :loading="isLoading"
            :disabled="isLoading || !question.trim()"
          >
            {{ isLoading ? 'Analyzing' : 'Generate Tree' }}
          </UButton>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits<{
  submit: [question: string]
}>()

const question = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  if (question.value.trim()) {
    emit('submit', question.value)
    question.value = ''
  }
}
</script>
