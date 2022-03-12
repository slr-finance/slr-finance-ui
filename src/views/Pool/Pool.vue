<template>
  <div
    ref="container"
    class="pool-page"
  >
    <component :is="`style`"> :root { --page-active-color: {{ poolInfo.page.activeColor }}; } </component>

    <pool-planet :pool-id="poolId" />

    <staking-widget
      class="staking-widget"
      :pool-id="poolId"
    />

    <staking-info
      class="staking-info"
      :pool-id="poolId"
    />
    <staking-navigation
      class="staking-nav"
      :pool-id="poolId"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import StakingWidget from './components/StakeWidget.vue'
  import StakingNavigation from './components/StakingNavigation.vue'
  import StakingInfo from './components/StakingInfo'
  import PoolPlanet from './components/PoolPlanet.vue'
  import { usePoolInfo } from './hooks/usePoolInfo'

  export default defineComponent({
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const poolInfo = usePoolInfo(toRef(props, 'poolId'))

      return {
        poolInfo,
      }
    },
    components: {
      StakingWidget,
      StakingInfo,
      StakingNavigation,
      PoolPlanet,
    },
  })
</script>

<style lang="postcss">
  .pool-page {
    @apply h-full grid bg-black;

    grid-template:
      '. pool .'
      '. info nav';
    grid-template-columns: 1fr minmax(auto, 1200px) 1fr;
    grid-template-rows: 1fr min-content;
    gap: 8px;
    background-size: contain;
  }

  .pool-page > .staking-widget {
    @apply h-full pt-64 relative z-40;

    grid-area: pool;
  }

  .pool-page > .staking-nav {
    @apply h-full pb-64 relative z-40;

    grid-area: nav;
  }

  .pool-page > .staking-info {
    @apply pb-64 relative z-40;

    grid-area: info;
  }
</style>
