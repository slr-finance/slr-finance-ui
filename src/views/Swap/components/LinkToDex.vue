<template>
  <ui-link-external
    :href="`https://pancake.kiemtienonline360.com/#/swap?outputCurrency=${tokenAddress}`"
    rel="noopener noreferrer"
    target="_blank"
  >
    <slot />
  </ui-link-external>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses'
  import { UiLinkExternal } from '@slr-finance/uikit'  

  export default defineComponent({
    name: 'link-to-dex',
    setup() {
      return {
        tokenAddress: contractsAddresses.SolarToken,
      }
    },
    components: { UiLinkExternal },
  })
</script>
