<template>
  <div class="absolute h-full top-0 right-ui-page-spacing flex">
    <div
      ref="container"
      class="sticky bottom-0 mt-auto pb-ui-page-bottom-spacing space-y-14"
    />
  </div>
</template>

<script lang="ts">
import { templateRef } from '@vueuse/core'
import { defineComponent, onMounted } from 'vue'
import { useAppFloatButtons } from './hooks/useAppFloatButtons'

export default defineComponent({
  name: 'app-float-button-container',
  setup() {
    const containerRef = templateRef<HTMLElement|null>('container')
    const { setTargetElement } = useAppFloatButtons()

    onMounted(() => {
      setTargetElement(containerRef.value)
    })
  },
})
</script>
