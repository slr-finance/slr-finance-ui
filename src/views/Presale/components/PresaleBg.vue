<template>
  <div
    class="pointer-events-none w-full flex justify-end items-stretch fixed z-bg-video left-1/2 transform -translate-x-1/2 bottom-0 aspect-swap-video"
    style="max-width: 866px"
  >
    <video
      class="w-full h-full"
      ref="video"
      autoplay
      playsinline
      loop
      muted
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { templateRef } from '@vueuse/core'
  import { playVideoFromCache } from '@/utils/video/cacheVideo'

  export default defineComponent({
    name: 'presale-bg',
    setup() {
      const videoRef = templateRef<HTMLVideoElement>('video')

      onMounted(() => {
        playVideoFromCache(videoRef.value, '/swap')
      })
    },
  })
</script>
