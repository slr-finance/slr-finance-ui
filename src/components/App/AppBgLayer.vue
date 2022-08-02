<template>
  <div class="pointer-events-none absolute top-0 left-0 z-bg-content w-full h-full">
    <div
      class="sticky top-0 left-0 flex"
      :style="styleList"
    >
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'app-bg-layer',
  setup() {
    const { width, height } = useWindowSize()
    const styleList = computed(() => ({
      width: `${width.value}px`,
      height: `${height.value}px`,
    }))

    return { styleList }
  }
})
</script>
