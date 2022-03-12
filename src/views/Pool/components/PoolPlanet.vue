<template>
  <div class="pool-planet-video h-full pointer-events-none fixed right-0 top-0">
    <video
      ref="video"
      autoplay
      loop
      muted
      class="w-full h-full"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, toRef, watch } from 'vue'
  import { templateRef } from '@vueuse/core'
  import { playVideoFromCache } from '@/utils/video/cacheVideo'
  import { usePoolInfo } from '../hooks/usePoolInfo'

  export default defineComponent({
    name: 'pool-planet',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const videoRef = templateRef<HTMLVideoElement>('video')
      const poolInfo = usePoolInfo(toRef(props, 'poolId'))
      const videoUrl = computed(() => poolInfo.value.page.videoUrl.large)

      onMounted(() => {
        playVideoFromCache(videoRef.value, videoUrl.value)
      })

      watch(videoUrl, () => playVideoFromCache(videoRef.value, videoUrl.value))
    },
  })
</script>

<style lang="postcss">
  .pool-planet-video {
    aspect-ratio: 1150 / 1080;
  }

  .pool-planet-video::after {
    aspect-ratio: 500 / 1080;
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    content: '';
    @apply block absolute top-0 left-0 h-full;
  }
</style>
