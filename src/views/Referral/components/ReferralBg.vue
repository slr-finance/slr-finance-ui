<template>
  <app-bg-layer>
    <video
      class="referral-bg-video"
      ref="video"
      autoplay
      playsinline
      loop
      muted
    />
  </app-bg-layer>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { templateRef } from '@vueuse/core'
  import { playVideoFromCache } from '@/utils/video/cacheVideo'
  import AppBgLayer from '@/components/App/AppBgLayer.vue'

  export default defineComponent({
    name: 'referral-bg',
    setup() {
      const videoRef = templateRef<HTMLVideoElement>('video')

      onMounted(() => {
        playVideoFromCache(videoRef.value, '/referral')
      })
    },
    components: { AppBgLayer },
  })
</script>

<style scoped>
.referral-bg-video {
  margin-left: auto;
  aspect-ratio: 20 / 27;
}
</style>