<template>
  <div class="flex min-h-full pb-48 pl-24">
    <pools-list class="staking-pools-list mr-24 relative z-10" />

    <router-view v-slot="{ Component }">
      <transition
        name="pool-page-transition"
        mode="out-in"
      >
        <component
          class="flex-1 overflow-x-hidden"
          :is="Component"
          :key="$route.name"
        />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { stakingModule } from '@/store/modules/stakingModule'
  import { useRoute, useRouter } from 'vue-router'
  import { POOLS_INFO } from '@/config/constants/Pools'
  import PoolsList from './components/PoolsList.vue'

  export default defineComponent({
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
    },
    components: {
      PoolsList,
    },
  })
</script>

<style lang="postcss">
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
