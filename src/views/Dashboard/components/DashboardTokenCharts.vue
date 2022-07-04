<template>
  <ui-chart/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiChart from '@/components/ui/UiChart.vue'

export default defineComponent({
  name: 'dashboard-token-charts',
  setup() {
    
  },
  components: { UiChart },
})
</script>
