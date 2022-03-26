<template>
  <div class="pt-[100px]">Click here 👇</div>
  <div>
    <a
      :href="`https://pancake.kiemtienonline360.com/#/swap?outputCurrency=${tokenAddress}`"
      target="_blank"
    >
      Pancake Swap
    </a>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'

  export default defineComponent({
    name: 'swap-page',
    setup() {
      return {
        tokenAddress: contractsAddresses.SolarToken,
      }
    },
  })
</script>
