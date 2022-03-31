<template>
  <div
    ref="container"
    class="pool-page"
  >
    <pool-planet :pool-id="poolId" />

    <staking-widget
      class="staking-widget"
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
  import PoolPlanet from './components/PoolPlanet.vue'

  export default defineComponent({
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    components: {
      StakingWidget,
      StakingNavigation,
      PoolPlanet,
    },
  })
</script>

<style lang="postcss">
  .pool-page {
    @apply grid bg-black;

    min-height: 100% !important; /* browser fill */
    height: auto;

    padding-top: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding));
    grid-template: 'pool nav';
    grid-template-columns: minmax(auto, 1200px) 1fr;
    grid-template-rows: 1fr;
    gap: 8px;
    background-size: contain;
  }

  .pool-page > .staking-widget {
    @apply h-full pt-80 relative z-40;

    grid-area: pool;
  }

  .pool-page > .staking-nav {
    @apply h-full relative z-40;

    grid-area: nav;
  }
</style>
