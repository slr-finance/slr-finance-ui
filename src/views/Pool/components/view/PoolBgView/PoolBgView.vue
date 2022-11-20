<template>
  <transition
    name="pool-page-transition"
    mode="out-in"
  >
    <div
      class="min-h-full h-auto w-full flex"
      :key="$route.name || 'none'"
    >
      <pool-video-bg
        v-if="isDesktopLayout && poolId"
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
  .pool-page-transition-enter-active {
    transition: all 0.3s ease-out;
  }

  .pool-page-transition-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .pool-page-transition-enter-from,
  .pool-page-transition-leave-to {
    opacity: 0;
  }
</style>