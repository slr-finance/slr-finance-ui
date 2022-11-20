<template>
  <div class="pools-faq-steps grid grid-cols-1 875:grid-cols-3 gap-24 mb-48 leading-192">
    <div class="item">
      <div class="icon-wrapper">
        <ui-icon-pixel-center class="w-20 h-20"/>
      </div>
      <div class="content">
        <p class="title">Buy SLR tokens</p>
        <p>You can buy SLR tokens on slr.finance/swap or nomiswap.io</p>
        <p>If you use a nomiswap then don't forget to set the slippage to 15%</p>
      </div>
    </div>
    <div class="item">
      <div class="icon-wrapper">
        <ui-icon-pixel-center class="w-20 h-20"/>
      </div>
      <div class="content">
        <p class="title">Stake SLR tokens on first pool</p>
        <p>Conquer the planets of the solar system one by one. And earn with more and more APY</p>
      </div>
    </div>
    <div class="item">
      <div class="icon-wrapper bg-yellow-500 rounded-full">
        <ui-icon-pixel-center class="w-20 h-20"/>
      </div>
      <div class="content">
        <p class="title">Earn up to 633% fixed APY</p>
        <p>Gain financial freedom with SLR Staking Pools</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { UiIconPixelCenter } from '@slr-finance/uikit'

  export default defineComponent({
    components: { UiIconPixelCenter },
    setup() {},
  })
</script>

<style
  lang="postcss"
  scoped
>
  .pools-faq-steps > .item {
    @apply rounded-12 px-16 py-24 relative text-12 875:block flex;
  }

  .pools-faq-steps > .item > .icon-wrapper {
    @apply flex justify-center items-center w-32 h-32 shrink-0;
  }

  .content {
    @apply 875:pl-0 pl-16;
  }
  .pools-faq-steps > .item:not(:last-child) {
    @apply bg-gray-800 bg-opacity-60 text-white text-opacity-50;
  }

  .pools-faq-steps > .item:last-child {
    @apply bg-violet-400 text-white text-opacity-70;
  }

  .pools-faq-steps > .item:not(:last-child)::after {
    @apply content-[''] block absolute bg-white z-10;
    height: calc(100% - 10px);
    width: 2px;
    top: 57.5px;
    left: 31px;
  }

  @media (min-width: 875px) {
    .pools-faq-steps > .item:not(:last-child)::after {
      width: calc(100% - 9px);
      height: 2px;
      top: 39px;
      left: 48.5px;
    }
  }

  .pools-faq-steps > .item > .content > .title {
    @apply text-14 mb-8 875:mt-16 text-white;
  }
</style>
