<template>
  <UModal :model-value="true">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Enter Gemini API Key</h3>
        <p class="text-sm text-gray-500 mt-1">
          Enter your Gemini API key to start. The key will be stored in memory
          for this session only.
        </p>
      </template>

      <form @submit="handleSubmit" class="space-y-4">
        <UInput
          v-model="apiKey"
          type="password"
          placeholder="Enter your API key"
        />
        <UButton type="submit" :disabled="!apiKey.trim()" block>
          Start Exploring
        </UButton>
      </form>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  submit: [apiKey: string]
}>()

const apiKey = ref('')

const handleSubmit = (e: Event) => {
  e.preventDefault()
  emit('submit', apiKey.value)
}
</script>
