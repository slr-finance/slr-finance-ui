<template>
  <div class="pt-[100px]">Click here 👇</div>
  <div>
    <a
      :href="`https://pancake.kiemtienonline360.com/#/swap?outputCurrency=${tokenAddress}`"
      target="_blank"
    >
      Pancake Swap
    </a>

    <swap-form />
    <div class="flex justify-center items-start leading-none">
      Power by
      <img
        src="/images/swap/pancake-full-white.svg"
        class="h-20 ml-4"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import SwapForm from './components/SwapForm.vue'

  export default defineComponent({
    name: 'swap-page',
    setup() {
      return {
        tokenAddress: contractsAddresses.SolarToken,
      }
    },
    components: {
      SwapForm,
    },
  })
</script>
