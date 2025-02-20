import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(import.meta.client ? window.innerWidth : 640)
  const height = ref(import.meta.client ? window.innerHeight : 800)

  function handleResize() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { width, height }
}
