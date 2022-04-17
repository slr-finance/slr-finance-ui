<template>
  <div class="flex flex-col min-h-full p-ui-page-spacing justify-between items-center relative z-1">
    <div class="page-padding swap-page-content">
      <div v-once class="875:text-center text-left">
        <h1 class="text-white font-title 875:text-38 mb-16 text-28">
          <span class="text-white text-opacity-60">Make</span>
          a space swap
        </h1>

        <p class="875:text-16 text-white text-opacity-60 text-14 mb-48">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
      </div>

      <div class="bg-black bg-opacity-10 600:p-24 p-10 rounded-20">
        <swap-form />
      </div>
    </div>

    <div>
      <mercuryo />
    </div>
  </div>
  <swap-bg v-once/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
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
  .page-padding {
    padding-top: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding));
  }
</style>
