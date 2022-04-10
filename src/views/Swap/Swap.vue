<template>
  <div class="flex flex-col justify-start items-center p-ui-page-spacing page-padding">
    <div class="swap-page-content">
      <h1 class="text-white font-title text-38 mb-16 text-center">
        <span class="text-white text-opacity-60">Make</span>
        a space swap
      </h1>

      <p class="text-16 text-white text-opacity-60 text-center mb-48">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </p>
      <swap-form />
      <power-by-dex />

      <mercuryo />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import SwapForm from './components/SwapForm.vue'
  import PowerByDex from './components/PowerByDex.vue'
  import Mercuryo from './components/Mercuryo.vue'

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
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .swap-page-content {
    max-width: 440px;
    width: 100%;
  }
  .page-padding {
    margin-top: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding));
  }
</style>
