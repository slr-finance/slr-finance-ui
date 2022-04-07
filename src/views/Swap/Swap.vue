<template>
  <div class="pt-[100px]">Click here 👇</div>
  <div>
    <swap-form />
    <power-by-dex />

    <mercuryo />
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
