<template>
  <transition
    name="pool-page-video-bg"
    mode="out-in"
  >
    <div
      class="min-h-full h-auto w-full flex"
      :key="$route.name || 'none'"
    >
      <pool-video-bg
        v-if="isDesktopLayout && poolId"
        :key="poolId"
        :pool-id="poolId"
      />
      <pool-mobile-bg
        v-else-if="poolId"
        :pool-id="poolId"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { useAppBreakpoints } from '@/hooks/useAppBreakpoints';
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute()
    const { w580: isDesktopLayout } = useAppBreakpoints()

    const poolId = computed(() => {
      const {poolId} = route.meta
      
      return typeof poolId === 'number' ? poolId : 0
    })

    return { isDesktopLayout, poolId }
  },
  components: {
    PoolVideoBg: defineAsyncComponent(() => import('./PoolVideoBg.vue')),
    PoolMobileBg: defineAsyncComponent(() => import('./PoolMobileBg.vue')),
  }
})
</script>

<style
  lang="postcss"
  scoped
>
.pool-page-video-bg-enter-active, .pool-page-video-bg-leave-active {
  transition: opacity 1s, transform 1s;
  transform-origin: center center;
}

.pool-page-video-bg-leave-active {
  transition: opacity 1s, transform 1s;
}

.pool-page-video-bg-enter-active, .pool-page-video-bg-leave-to {
  opacity: 0;
  transform: scale(3);
}

.pool-page-video-bg-leave-to {
  opacity: 0;
  transform: translateX(400px);
}

.pool-page-video-bg-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>