<template>
  <a
    :href="`https://pancake.kiemtienonline360.com/#/swap?outputCurrency=${tokenAddress}`"
    rel="noopener noreferrer"
    target="_blank"
  >
    <slot />
  </a>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'

  export default defineComponent({
    name: 'link-to-dex',
    setup() {
      return {
        tokenAddress: contractsAddresses.SolarToken,
      }
    },
  })
</script>
