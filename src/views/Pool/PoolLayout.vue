<template>
  <div class="flex flex-1">
    <pools-list v-if="!isShownPoolsNav"/>

    <main
      v-if="poolId && poolInfo"
      class="box-content min-h-full h-auto px-ui-page-spacing relative z-ui-page-content page-content flex flex-col justify-center"
      style="max-width: 321px;"
    >
      <pool-page-description :pool-info="poolInfo"/>
      <pool-page-title :pool-info="poolInfo"/>
      <pool-page-apy :pool-id="poolId"/>

      <connect-wallet-plug>
        <template #plug>
          <stake-form :pool-id="poolId"/>
        </template>

        <template #default>
          <router-view v-slot="{ Component }">
            <transition
              name="pool-page-transition"
              mode="out-in"
            >
              <div
                class="h-auto flex flex-1"
                :key="$route.name || 'none'"
              >
                <component :is="Component" />
              </div>
            </transition>
          </router-view>
        </template>
      </connect-wallet-plug>

      <pool-page-tvl :pool-id="poolId" class="mb-24"/>
      <pool-page-about :pool-info="poolInfo"/>
      <token-info />
    </main>

    <div class="flex flex-col justify-end items-end h-full absolute right-ui-page-spacing top-0 bottom-0">
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
import { computed, defineAsyncComponent, defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { POOLS_INFO } from '@/config/constants/Pools'
import { useStakerState } from './hooks/useStakerState'
import { useAppBreakpoints } from '@/hooks/useAppBreakpoints'
import PoolPageDescription from './components/PoolPageDescription.vue'
import PoolPageTitle from './components/PoolPageTitle.vue'
import TokenInfo from './components/TokenInfo.vue'
import PoolPageApy from './components/PoolPageApy.vue'
import PoolPageAbout from './components/PoolPageAbout.vue'
import { usePoolInfo } from './hooks/usePoolInfo'
import PoolPageTvl from './components/PoolPageTvl.vue'
import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
import StakeForm from './components/StakeForm.vue'
import { useHead } from '@vueuse/head'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { stakerState } = useStakerState()
    const poolId = ref(0)
    const poolInfo = usePoolInfo(poolId)

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

    const pageTitle = computed(() => `${poolInfo.value?.name} Pool`)
    const pageDescription = computed(() => poolInfo.value?.page.description)
  
    useHead({
      title: pageTitle,
      meta: [
        {
          name: 'description',
          content: pageDescription,
        },
      ],
    })

    return {
      isShownPoolsMap,
      isShownPoolsNav,
      poolId,
      poolInfo,
    }
  },
  components: {
    PoolsMap: defineAsyncComponent(() => import('./components/PoolsMap.vue')),
    PoolsList: defineAsyncComponent(() => import('./components/PoolsList.vue')),
    PoolPageDescription,
    PoolPageTitle,
    PoolPageApy,
    PoolPageAbout,
    PoolPageTvl,
    TokenInfo,
    ConnectWalletPlug,
    StakeForm,
  },
})
</script>

<style>
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
