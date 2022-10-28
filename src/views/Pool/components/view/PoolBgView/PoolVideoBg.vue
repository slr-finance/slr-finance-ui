<template>
  <div
    class="pool-bg-video-wrapper"
  >
    <video
      class="w-full h-full"
      ref="videoRef"
      autoplay
      playsinline
      loop
      muted
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { usePoolInfo } from '../../../hooks/usePoolInfo'
  import { useAppVideoCache } from '@/hooks/useAppVideoCache'

  export default defineComponent({
    name: 'pool-video-bg',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const poolInfo = usePoolInfo(toRef(props, 'poolId'))
      const videoFolder = computed(() => poolInfo.value.page.videoFolder)
      const { videoRef } = useAppVideoCache(videoFolder)

      return { videoRef }
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