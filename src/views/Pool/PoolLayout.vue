<template>
  <div class="flex min-h-full pb-48 px-24 bg-black">
    <pools-list
      class="staking-pools-list mr-24 relative z-10"
      v-if="isLaptop"
    />

    <router-view v-slot="{ Component }">
      <transition
        name="pool-page-transition"
        mode="out-in"
      >
        <component
          class="flex-1 overflow-x-hidden page-padding"
          :is="Component"
          :key="$route.name"
        />
      </transition>
    </router-view>

    <div
      v-if="isDesktop"
      class="page-padding"
    >
      <pools-navigation :pool-id="poolId" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { stakingModule } from '@/store/modules/stakingModule'
  import { useRoute, useRouter } from 'vue-router'
  import { useBreakpoints } from '@vueuse/core'
  import { POOLS_INFO } from '@/config/constants/Pools'
  import PoolsList from './components/PoolsList.vue'
  import PoolsNavigation from './components/PoolsNavigation.vue'

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

      const { isDesktop, isLaptop } = useBreakpoints({ isDesktop: 641, isLaptop: 541 })

      return {
        isDesktop,
        isLaptop,
      }
    },
    components: {
      PoolsList,
      PoolsNavigation,
    },
  })
</script>

<style lang="postcss">
  .page-padding {
    padding-top: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding) + 80px);
  }
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
