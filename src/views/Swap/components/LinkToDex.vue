<template>
  <ui-external-link
    :href="`https://pancake.kiemtienonline360.com/#/swap?outputCurrency=${tokenAddress}`"
    rel="noopener noreferrer"
    target="_blank"
  >
    <slot />
  </ui-external-link>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses'
  import UiExternalLink from '@/components/ui/UiExternalLink.vue'

  export default defineComponent({
    name: 'link-to-dex',
    setup() {
      return {
        tokenAddress: contractsAddresses.SolarToken,
      }
    },
    components: { UiExternalLink },
  })
</script>
