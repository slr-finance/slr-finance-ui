<template>
  <ui-chart />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'

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
