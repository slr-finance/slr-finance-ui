<template>
  <ui-chart />
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
