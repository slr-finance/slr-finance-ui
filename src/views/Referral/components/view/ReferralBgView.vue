<template>
  <video
    v-if="isShownBgVideo"
    class="referral-bg-video"
    ref="videoRef"
    autoplay
    playsinline
    loop
    muted
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useAppBreakpoints } from '@/hooks/useAppBreakpoints'
  import { useAppVideoCache } from '@/hooks/useAppVideoCache'

  export default defineComponent({
    name: 'referral-bg-view',
    setup() {
      const { w1200: isShownBgVideo } = useAppBreakpoints()
      const { videoRef } = useAppVideoCache('/referral', isShownBgVideo)

      return { videoRef, isShownBgVideo }
    },
  })
</script>

<style scoped>
.referral-bg-video {
  margin-left: auto;
  aspect-ratio: 20 / 27;
}
</style>