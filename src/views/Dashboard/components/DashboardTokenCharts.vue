<template>
  <iframe
    class="bg-gray-800 bg-opacity-70 rounded-12"
    width="100%" height="1000" frameBorder="0" scrolling="no" src="https://coinbrain.com/embed/bnb-0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82?theme=custom&accent=6d0dfc&padding=16&background=121212&chart=1&trades=1&simple=1"
  ></iframe>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  import { UiGalaxyLoader } from '@slr-finance/uikit'

  export default defineComponent({
    name: 'dashboard-token-charts',
    setup() {},
    components: {
      UiChart: defineAsyncComponent({
        loader: () => import('@/components/ui/UiChart.vue'),
        loadingComponent: UiGalaxyLoader,
      }),
    },
  })
</script>
