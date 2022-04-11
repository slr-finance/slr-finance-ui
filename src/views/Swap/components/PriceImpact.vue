<template>
  <div class="flex justify-between items-center text-12 text-white">
    <div class="text-white text-opacity-60">Price Impact</div>
    <div>{{ priceImpactStr }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRef } from 'vue'
  import BigNumber from 'bignumber.js'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'

  export default defineComponent({
    name: 'price-impact',
    props: {
      priceImpact: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
    },
    setup(props) {
      const priceImpactStr = usePercentFormat(toRef(props, 'priceImpact'))

      return {
        priceImpactStr,
      }
    },
  })
</script>
