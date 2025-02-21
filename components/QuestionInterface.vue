<template>
  <form
    @submit="handleSubmit"
    class="p-6 border-b border-gray-800 bg-gray-900/90"
  >
    <div class="w-full xl:w-8/12 2xl:w-5/12 mx-auto">
      <div class="grid grid-cols-1 gap-4">
        <div class="w-full">
          <div class="flex space-x-4 items-center bg-gray-800 rounded-lg p-3">
            <UTextarea
              autoresize
              id="question"
              v-model="question"
              placeholder="Enter your ethical dilemma"
              class="flex-1 no-scrollbar"
              variant="none"
              :rows="1"
              :maxrows="4"
              :padded="false"
              size="xl"
              :ui="{
                placeholder: 'placeholder-red-400 dark:placeholder-gray-300',
              }"
            />
            <UButton
              type="submit"
              :loading="isLoading"
              :disabled="isLoading || !question.trim()"
              class="self-end"
            >
              {{ isLoading ? 'Analyzing' : 'Generate Tree' }}
            </UButton>
          </div>
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

<style scoped>
.no-scrollbar :deep(textarea) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar :deep(textarea::-webkit-scrollbar) {
  display: none;
}
</style>
