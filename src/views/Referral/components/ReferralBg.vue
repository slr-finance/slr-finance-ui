<template>
  <div
    class="pointer-events-none h-full flex justify-end items-stretch fixed right-0 top-0 aspect-referral-bg-video"
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
  import { defineComponent, onMounted } from 'vue'
  import { templateRef } from '@vueuse/core'
  import { playVideoFromCache } from '@/utils/video/cacheVideo'

  export default defineComponent({
    name: 'referral-bg',
    setup() {
      const videoRef = templateRef<HTMLVideoElement>('video')

      onMounted(() => {
        playVideoFromCache(videoRef.value, '/referral')
      })
    },
  })
</script>
