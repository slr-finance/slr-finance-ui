<template>
  <div class="relative w-72">
    <div
      class="pool-navigation absolute right-0 top-0 overflow-hidden bg-white bg-opacity-20 rounded-12 px-8 text-12"
      :class="classList"
    >
      <transition
        mode="out-in"
        name="fade"
      >
        <div
          :key="poolId"
          class="wrapper flex flex-col justify-start"
        >
          <pools-navigation-link
            up
            :is-fetching="isFetching"
            :apy="prevApy"
            :pool-id="prevPoolId"
          />

          <pools-navigation-link
            :is-fetching="isFetching"
            :apy="nextApy"
            :pool-id="nextPoolId"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { MAX_POOL_ID } from '@/config/constants/Pools'
  import { usePoolState } from '../../../hooks/usePoolState'
  import { usePoolsState } from '../../../hooks/usePoolsState'
  import { BIG_ZERO } from '@/utils/bigNumber'
  import { useRoute } from 'vue-router'
  import PoolsNavigationLink from './PoolsNavigationLink.vue'

  export default defineComponent({
    name: 'staking-navigation',
    setup() {
      const route = useRoute()
      const poolId = computed(() => {
        const {poolId} = route.meta
        
        return typeof poolId === 'number' ? poolId : 0
      })
      
      const prevPoolId = computed(() => (poolId.value > 1 ? poolId.value - 1 : 0))
      const nextPoolId = computed(() => (poolId.value < MAX_POOL_ID ? poolId.value + 1 : 0))

      const { isFetching } = usePoolsState()
      const [prevPoolData] = usePoolState(prevPoolId)
      const [nextPoolData] = usePoolState(nextPoolId)
      const prevApy = computed(() => (prevPoolData.value?.apy ?? BIG_ZERO).toNumber())
      const nextApy = computed(() => (nextPoolData.value?.apy ?? BIG_ZERO).toNumber())

      const classList = computed(() => (prevPoolId.value && nextPoolId.value ? '-full' : '-single'))

      return {
        poolId,
        prevPoolId,
        nextPoolId,
        prevApy,
        nextApy,
        classList,
        isFetching,
      }
    },
    components: { PoolsNavigationLink },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .pool-navigation {
    @apply absolute right-0 top-0;
    min-width: 155px;
    transition: height 0.7s;
  }

  .pool-navigation.-full {
    height: 80px;
  }

  .pool-navigation.-full::before {
    width: calc(100% - 16px);
    @apply absolute top-1/2 h-1 bg-white bg-opacity-40 content-[''];
  }

  .pool-navigation.-single {
    height: 40px;
  }

  .link {
    @apply outline-none text-white;
  }

  .link:hover {
    @apply outline-none text-gray-500;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
