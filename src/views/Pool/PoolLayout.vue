<template>
  <div
    class="pr-ui-page-spacing relative pt-ui-page-header-spacing flex flex-1 min-h-full bg-black"
    :class="{ 'pl-ui-page-spacing': isDesktopLayout }"
  >
    <div class="mr-ui-page-spacing z-ui-page-content pb-ui-page-bottom-spacing">
      <pools-list :is-mobile="!isDesktopLayout" />
    </div>

    <div class="flex-1 pb-ui-page-bottom-spacing">
      <router-view
        v-slot="{ Component }"
        v-if="poolId"
      >
        <transition
          name="pool-page-transition"
          mode="out-in"
        >
          <div
            class="min-h-full h-auto flex"
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
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>

    <template v-if="isShownPoolsNav">
      <div class="flex flex-col justify-between items-end">
        <div class="flex-1 mb-80">
          <pools-navigation
            v-memo="[poolId]"
            :pool-id="poolId"
          />
        </div>

        <div class="sticky bottom-0">
          <pools-map
            class="pools-map-wrapper"
            v-if="isShownPoolsMap"
          />
        </div>
      </div>
    </template>

    <pools-faq-modal />
    <pools-faq-button />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useBreakpoints } from '@vueuse/core'
  import { POOLS_INFO } from '@/config/constants/Pools'
  import { useStakerState } from './hooks/useStakerState'

  export default defineComponent({
    props: {
      poolId: {
        type: Number,
        default: 0,
      },
    },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const { stakerState } = useStakerState()

      watch(
        route,
        ({ name }) => {
          if (name === 'pool') {
            const {
              value: { poolId },
            } = stakerState

            if (poolId > 0 && poolId <= POOLS_INFO.length) {
              router.replace({ name: POOLS_INFO[poolId - 1].routeName })
            } else {
              router.replace({ name: POOLS_INFO[0].routeName })
            }
          }
        },
        { immediate: true },
      )

      const { isShownPoolsMap, isShownPoolsNav, isDesktopLayout } = useBreakpoints({
        isShownPoolsMap: 1000,
        isShownPoolsNav: 641,
        isDesktopLayout: 541,
      })

      return {
        isShownPoolsMap,
        isShownPoolsNav,
        isDesktopLayout,
      }
    },
    components: {
      PoolsList: defineAsyncComponent(() => import('./components/PoolsList.vue')),
      PoolsNavigation: defineAsyncComponent(() => import('./components/PoolsNavigation.vue')),
      PoolsMap: defineAsyncComponent(() => import('./components/PoolsMap.vue')),
      PoolVideoBg: defineAsyncComponent(() => import('./components/PoolBg/PoolVideoBg.vue')),
      PoolMobileBg: defineAsyncComponent(() => import('./components/PoolBg/PoolMobileBg.vue')),
      PoolsFaqModal: defineAsyncComponent(() => import('./components/PoolsFaq/PoolsFaqModal.vue')),
      PoolsFaqButton: defineAsyncComponent(() => import('./components/PoolsFaq/PoolsFaqButton.vue')),
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .pool-page-transition-enter-active {
    transition: all 0.3s ease-out;
  }

  .pools-map-wrapper {
    margin-right: calc(var(--ui-page-spacing) + 48px);
  }

  .pool-page-transition-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .pool-page-transition-enter-from,
  .pool-page-transition-leave-to {
    opacity: 0;
  }
</style>
