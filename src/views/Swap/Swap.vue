<template>
  <div
    class="flex flex-1 flex-col justify-between items-center"
  >
    <div class="swap-page-content relative z-ui-page-content">
      <div
        v-once
        class="875:text-center text-left"
      >
        <h1 class="text-white font-title mb-16 text-ui-page-title">
          <span class="text-white text-opacity-60">Make</span>
          a space swap
        </h1>

        <p class="text-ui-page-description text-white text-opacity-60 mb-48">
          Trading without setting slippage. Make a swap with automatic settings
        </p>
      </div>

      <div class="bg-black bg-opacity-30 600:p-24 p-10 rounded-20">
        <swap-form />
      </div>
    </div>

    <div class="relative z-ui-page-content">
      <mercuryo />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useHead } from '@vueuse/head'
  import contractsAddresses from '@/config/constants/contractsAddresses'
  import SwapForm from './components/SwapForm.vue'
  import Mercuryo from './components/Mercuryo.vue'

  export default defineComponent({
    name: 'swap-page',
    setup() {
      useHead({
        title: 'SLR Swap',
        meta: [
          {
            name: 'description',
            content: 'SLR Swap',
          },
        ],
      })

      return {
        tokenAddress: contractsAddresses.SolarToken,
      }
    },
    components: {
      SwapForm,
      Mercuryo,
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
