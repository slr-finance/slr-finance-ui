<template>
  <div
    :style="videoBgWrapperStyleList"
    class="pointer-events-none absolute top-0 left-0 z-bg-content w-full"
  >
    <div
      class="sticky top-0 left-0 flex"
      :style="bgVideoStyleList"
    >
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'default-layout-video-bg',
  props: {
    contentHeight: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { width, height } = useWindowSize()

    const bgVideoStyleList = computed(() => {
      return {
        height: `${Math.min(props.contentHeight, height.value)}px`,
        width: `${width.value}px`,
      }
    })

    const videoBgWrapperStyleList = computed(() => {
      return {
        height: `${props.contentHeight}px`,
        width: `${width.value}px`,
      }
    })

    return { bgVideoStyleList, videoBgWrapperStyleList }
  },
})
</script>
