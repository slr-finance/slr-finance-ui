<template>
  <div
    ref="root"
    class="pointer-events-none absolute top-0 left-0 z-bg-content w-full h-full"
  >
    <div
      class="sticky top-0 left-0 flex"
      :style="styleList"
    >
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { templateRef, useResizeObserver } from '@vueuse/core'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'app-bg-layer',
  setup() {
    const rootRef = templateRef('root')
    const styleList = ref({
      width: `0px`,
      height: `0px`,
    })

    useResizeObserver(rootRef, ([{ contentRect: { width, height } }]) => {
      styleList.value = {
        width: `${width}px`,
        height: `${height}px`,
      }
    })

    return { styleList }
  }
})
</script>
