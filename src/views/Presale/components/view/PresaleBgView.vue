<template>
  <video
    class="presale-bg-video"
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
    name: 'presale-bg-view',
    setup() {
      const { videoRef } = useAppVideoCache('/swap')

      return { videoRef }
    },
  })
</script>

<style scoped>
.presale-bg-video {
  @apply mx-auto mt-auto;
  max-width: 866px;
}
</style>