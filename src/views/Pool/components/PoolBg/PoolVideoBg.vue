<template>
  <app-bg-layer>
    <div
      class="pool-bg-video-wrapper"
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
  </app-bg-layer>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, toRef, watch } from 'vue'
  import { templateRef } from '@vueuse/core'
  import { playVideoFromCache } from '@/utils/video/cacheVideo'
  import { usePoolInfo } from '../../hooks/usePoolInfo'
  import AppBgLayer from '@/components/App/AppBgLayer.vue'

  export default defineComponent({
  components: { AppBgLayer },
    name: 'pool-video-bg',
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

      onMounted(() => playVideoFromCache(videoRef.value, videoFolder.value))
      watch(videoFolder, () => playVideoFromCache(videoRef.value, videoFolder.value))
    },
  })
</script>


<style scoped>
.pool-bg-video-wrapper {
  @apply ml-auto max-h-100vh relative;
  aspect-ratio: 125 / 108;
}
.pool-bg-video-wrapper::after {
  @apply content-[''] block absolute top-0 left-0 h-full bg-gradient-to-r from-black to-transparent;
  aspect-ratio: 25 / 54;
}
</style>