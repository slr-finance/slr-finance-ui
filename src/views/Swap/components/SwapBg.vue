<template>
  <div
    class="pointer-events-none w-full flex justify-end items-stretch fixed left-1/2 transform -translate-x-1/2 bottom-0 aspect-swap-video before:content-[' '] before:block before:absolute before:top-0 before:left-0 before:h-full before:aspect-pool-video-gradient before:bg-gradient-to-r before:from-black before:to-transparent"
    style="max-width: 866px"
  >
    <video
      class="w-full h-full"
      ref="video"
      autoplay
      loop
      muted
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, toRef, watch } from 'vue'
  import { templateRef } from '@vueuse/core'
  import { playVideoFromCache } from '@/utils/video/cacheVideo'

  export default defineComponent({
    name: 'swap-bg',
    setup(props) {
      const videoRef = templateRef<HTMLVideoElement>('video')

      onMounted(() => {
        playVideoFromCache(videoRef.value, '/swap')
      })
    },
  })
</script>
