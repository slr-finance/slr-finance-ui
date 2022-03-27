<template>
  <div
    class="pointer-events-none flex justify-end items-stretch h-full fixed right-0 top-0 aspect-pool-video before:content-[' '] before:block before:absolute before:top-0 before:left-0 before:h-full before:aspect-pool-video-gradient before:bg-gradient-to-r before:from-black before:to-transparent"
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
      const videoFolder = computed(() => poolInfo.value.page.videoFolder)

      onMounted(() => {
        playVideoFromCache(videoRef.value, videoFolder.value)
      })

      watch(videoFolder, () => playVideoFromCache(videoRef.value, videoFolder.value))
    },
  })
</script>
