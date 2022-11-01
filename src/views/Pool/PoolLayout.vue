<template>
  <div class="flex flex-1">
    <pools-list v-if="!isShownPoolsNav"/>
    <router-view
      v-slot="{ Component }"
      v-if="poolId"
    >
      <transition
        name="pool-page-transition"
        mode="out-in"
      >
        <div
          class="min-h-full pl-ui-page-spacing h-auto flex flex-1"
          :key="$route.name || 'none'"
        >
          <component :is="Component" />
        </div>
      </transition>
    </router-view>

    <div class="flex flex-col justify-end items-end h-full absolute right-0 top-0 bottom-0">
      <div class="sticky bottom-0">
        <pools-map
          class="pools-map-wrapper"
          v-if="isShownPoolsMap"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { POOLS_INFO } from '@/config/constants/Pools'
  import { useStakerState } from './hooks/useStakerState'
  import { useAppBreakpoints } from '@/hooks/useAppBreakpoints'

  export default defineComponent({
    setup() {
      const route = useRoute()
      const router = useRouter()
      const { stakerState } = useStakerState()
      const poolId = ref(0)

      watch(
        route,
        ({ name, meta: { poolId: routePoolId } }) => {
          if (name === 'pool') {
            const {
              value: { poolId: stakerPoolId },
            } = stakerState

            if (stakerPoolId > 0 && stakerPoolId <= POOLS_INFO.length) {
              router.replace({ name: POOLS_INFO[stakerPoolId - 1].routeName })
            } else {
              router.replace({ name: POOLS_INFO[0].routeName })
            }
          } else {
            poolId.value = typeof routePoolId === 'number' ? routePoolId : POOLS_INFO[0].id
          }
        },
        { immediate: true },
      )

      const { w1000: isShownPoolsMap, w641: isShownPoolsNav, } = useAppBreakpoints()

      return {
        isShownPoolsMap,
        isShownPoolsNav,
        poolId
      }
    },
    components: {
      PoolsMap: defineAsyncComponent(() => import('./components/PoolsMap.vue')),
      PoolsList: defineAsyncComponent(() => import('./components/PoolsList.vue')),
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

  .pool-page-transition-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .pool-page-transition-enter-from,
  .pool-page-transition-leave-to {
    opacity: 0;
  }
</style>
