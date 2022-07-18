<template>
  <div
    class="pr-ui-page-spacing pb-ui-page-bottom-spacing pt-ui-page-header-spacing flex flex-1 min-h-full bg-black"
    :class="{ 'pl-ui-page-spacing': isDesktopLayout }"
  >
    <div class="mr-ui-page-spacing z-ui-page-content">
      <pools-list :is-mobile="!isDesktopLayout" />
    </div>

    <div class="flex-1">
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
        <pools-navigation
          v-memo="[poolId]"
          :pool-id="poolId"
        />

        <pools-faq-button />
      </div>

      <pools-map
        class="fixed bottom-0 pools-map-wrapper"
        v-if="isShownPoolsMap"
      />
    </template>

    <pools-faq-modal />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch } from 'vue'
  import { stakingModule } from '@/store/modules/stakingModule'
  import { useRoute, useRouter } from 'vue-router'
  import { useBreakpoints } from '@vueuse/core'
  import { POOLS_INFO } from '@/config/constants/Pools'

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

      watch(
        route,
        ({ name }) => {
          if (name === 'pool') {
            const {
              state: {
                staker: { poolId },
              },
            } = stakingModule

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
      PoolVideoBg: defineAsyncComponent(() => import('./components/PoolVideoBg.vue')),
      PoolMobileBg: defineAsyncComponent(() => import('./components/PoolMobileBg.vue')),
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
    right: var(--ui-page-right-spacing-with-right-buttons);
  }

  .pool-page-transition-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .pool-page-transition-enter-from,
  .pool-page-transition-leave-to {
    opacity: 0;
  }
</style>
