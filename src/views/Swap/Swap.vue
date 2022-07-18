<template>
  <div
    class="flex flex-1 flex-col min-h-full px-ui-page-spacing pt-ui-page-header-spacing pb-ui-page-bottom-spacing justify-between items-center relative z-ui-page-content"
  >
    <div class="swap-page-content">
      <div
        v-once
        class="875:text-center text-left"
      >
        <h1 class="text-white font-title mb-16 text-ui-page-title">
          <span class="text-white text-opacity-60">Make</span>
          a space swap
        </h1>

        <p class="text-ui-page-description text-white text-opacity-60 mb-48">
          Trading without setting slippage. We will automatically set the best settings.
        </p>
      </div>

      <div class="bg-black bg-opacity-30 600:p-24 p-10 rounded-20">
        <swap-form />
      </div>
    </div>

    <div>
      <mercuryo />
    </div>
  </div>
  <swap-bg v-once />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses'
  import SwapForm from './components/SwapForm.vue'
  import PowerByDex from './components/PowerByDex.vue'
  import Mercuryo from './components/Mercuryo.vue'
  import SwapBg from './components/SwapBg.vue'

  export default defineComponent({
    name: 'swap-page',
    setup() {
      return {
        tokenAddress: contractsAddresses.SolarToken,
      }
    },
    components: {
      SwapForm,
      PowerByDex,
      Mercuryo,
      SwapBg,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .swap-page-content {
    max-width: 488px;
    width: 100%;
  }
</style>
