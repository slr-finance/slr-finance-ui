<template>
  <div class="px-ui-page-spacing pb-ui-page-spacing flex min-h-full bg-black">
    <div
      v-if="isShownPoolsList"
      class="mr-ui-page-spacing relative z-10 w-72"
    >
      <pools-list/>
    </div>

    <div class="flex-1 page-padding">
      <router-view v-slot="{ Component }">
        <transition
          name="pool-page-transition"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="$route.name"
          />
        </transition>
      </router-view>
    </div>

    <div
      v-if="isShownPoolsNav"
      class="page-padding flex flex-col justify-between items-end"
    >
      <pools-navigation :pool-id="poolId" />
        
      <pools-map
        class="fixed bottom-0 pools-map-wrapper"
        v-if="isShownPoolsMap"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch } from 'vue'
  import { stakingModule } from '@/store/modules/stakingModule'
  import { useRoute, useRouter } from 'vue-router'
  import { useBreakpoints } from '@vueuse/core'
  import { POOLS_INFO } from '@/config/constants/Pools'

  const PoolsList = defineAsyncComponent(() => {
    return import('./components/PoolsList.vue')
  })

  const PoolsNavigation = defineAsyncComponent(() => {
    return import('./components/PoolsNavigation.vue')
  })

  const PoolsMap = defineAsyncComponent(() => {
    return import('./components/PoolsMap.vue')
  })

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

      const { isShownPoolsMap, isShownPoolsNav, isShownPoolsList } = useBreakpoints({
        isShownPoolsMap: 1000,
        isShownPoolsNav: 641,
        isShownPoolsList: 541,
      })

      return {
        isShownPoolsMap,
        isShownPoolsNav,
        isShownPoolsList,
      }
    },
    components: {
      PoolsList,
      PoolsNavigation,
      PoolsMap,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .page-padding {
    margin-top: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding) + 80px);
  }
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
