<template>
  <app-bg-layer>
    <video
      class="presale-bg-video"
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
    name: 'presale-bg',
    setup() {
      const videoRef = templateRef<HTMLVideoElement>('video')

      onMounted(() => {
        playVideoFromCache(videoRef.value, '/swap')
      })
    },
    components: { AppBgLayer },
  })
</script>

<style scoped>
.presale-bg-video {
  @apply mx-auto mt-auto;
  max-width: 866px;
}
</style>