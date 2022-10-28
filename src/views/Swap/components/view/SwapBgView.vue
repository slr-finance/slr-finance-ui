<template>
  <video
    class="swap-bg-video"
    ref="videoRef"
    autoplay
    playsinline
    loop
    muted
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useAppVideoCache } from '@/hooks/useAppVideoCache'

  export default defineComponent({
    name: 'swap-bg',
    setup() {
      const { videoRef } = useAppVideoCache('/swap')

      return { videoRef }
    },
  })
</script>

<style scoped>
.swap-bg-video {
  @apply mx-auto mt-auto;
  max-width: 866px;
}
</style>