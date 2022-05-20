<template>
  <div>
    <div class="pools-map relative overflow-hidden pointer-events-none select-none rounded-t-18 bg-black">
      <picture>
        <source
          srcset="/images/pools/map/bg.webp"
          type="image/webp"
        />
        <img
          src="/images/pools/map/bg.jpg"
          class="absolute inset-0"
          width="394"
          height="246"
        />
      </picture>
      <div class="uppercase text-12 font-title p-18 relative z-1">Solar Farming System</div>
      <div>
        <div
          v-for="pool in pools"
          :key="pool.id"
          :style="{ left: `${pool.position.x}px`, top: `${pool.position.y}px` }"
          :class="{ '-active': pool.id === stakerPoolId, '-ended': pool.id < stakerPoolId }"
          class="pool absolute z-1 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
        >
          <div :style="{ width: `${pool.position.radius}px`, height: `${pool.position.radius}px` }"></div>
          <div class="pool-info text-10 whitespace-nowrap">
            <div class="apy text-white text-opacity-70 font-title">APY {{ pool.apyStr }}%</div>
            <div class="your-point text-8 text-yellow">Your point</div>
            <div class="ended text-8 text-white text-opacity-70">Ended</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { usePools } from '@/store/hooks/usePools'
  import { useStaker } from '@/store/hooks/useStaker'

  const poolsPosition = [
    { id: 1, x: 356.5, y: 62, radius: 12 },
    { id: 2, x: 311, y: 93, radius: 32 },
    { id: 3, x: 271, y: 61.5, radius: 16 },
    { id: 4, x: 221, y: 93, radius: 36 },
    { id: 5, x: 233, y: 127, radius: 16 },
    { id: 6, x: 157, y: 120, radius: 24 },
    { id: 7, x: 141, y: 148, radius: 24 },
    { id: 8, x: 92, y: 151, radius: 12 },
    { id: 9, x: 18, y: 178, radius: 92 },
  ]

  export default defineComponent({
    name: 'pools-list',
    inheritAttrs: true,
    setup() {
      const poolsStates = usePools()
      const pools = computed(() => {
        return poolsPosition.map(({ id, ...poolPosition }) => {
          const apyNum = poolsStates.value[id].apy?.toNumber() ?? 0
          const apyStr = (apyNum * 100).toLocaleString('en-En', {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            style: 'decimal',
          })

          return {
            id,
            position: poolPosition,
            apyStr,
          }
        })
      })
      const [stakerState] = useStaker()
      const stakerPoolId = computed(() => stakerState.value.poolId)
      return { pools, stakerPoolId }
    },
    components: { UiIcon },
  })
</script>
<style
  lang="postcss"
  scoped
>
  .pools-map {
    width: 394px;
    height: 246px;
  }
  .pools-map .pool.-active {
    @apply transition-all duration-500;
    box-shadow: 0 0 0 0px theme('colors.violet.500') inset, 0 0 0 0px rgb(109 13 252 / 20%);
  }

  .pools-map .pool.-active {
    box-shadow: 0 0 0 2px theme('colors.violet.500') inset, 0 0 0 6px rgb(109 13 252 / 20%);
  }

  .pools-map .pool:last-child.-active {
    box-shadow: 0 0 0 0px theme('colors.yellow.500') inset, 0 0 0 0px rgb(109 13 252 / 20%);
  }

  .pools-map .pool:last-child.-active {
    box-shadow: 0 0 0 2px theme('colors.yellow.500') inset, 0 0 0 6px rgb(109 13 252 / 20%);
  }

  .pools-map .pool .pool-info {
    @apply absolute left-1/2 transform -translate-x-1/2 text-center;
  }

  .pools-map .pool .pool-info::after {
    @apply content-[''] block w-1 h-12 bg-white bg-opacity-70 absolute left-1/2 transform -translate-x-1/2 transition-all duration-500;
  }

  .pools-map .pool:nth-child(even) .pool-info {
    bottom: calc(100% + 18px);
  }
  .pools-map .pool:nth-child(even) .pool-info::after {
    top: calc(100% + 2px);
  }
  .pools-map .pool:nth-child(odd) .pool-info {
    top: calc(100% + 18px);
  }
  .pools-map .pool:nth-child(odd) .pool-info::after {
    bottom: calc(100% + 2px);
  }

  .pools-map .pool:last-child .pool-info {
    top: 100%;
    left: 130px;
  }

  .pools-map .pool:last-child .pool-info .apy {
    @apply text-opacity-100 text-12;
  }
  .pools-map .pool:last-child .pool-info::after {
    bottom: calc(100% - 9px);
    height: 6px;
    left: -50px;
  }

  .pools-map .pool:last-child .pool-info::before {
    @apply content-[''] block w-36 h-1 bg-white bg-opacity-70 absolute left-1/2 transform -translate-x-1/2 transition-all duration-500;
    bottom: calc(100% - 9px);
    left: -32px;
  }

  .pools-map .pool:not(.-active) .your-point {
    display: none;
  }

  .pools-map .pool:not(.-ended) .ended {
    display: none;
  }

  .pools-map .pool.-ended .ended {
    display: block;
  }

  .pools-map .pool.-active .pool-info::after,
  .pools-map .pool.-active .pool-info::before {
    @apply bg-violet;
  }

  .pools-map .pool:last-child.-active .pool-info::after,
  .pools-map .pool:last-child.-active .pool-info::before {
    @apply bg-yellow;
  }
</style>
