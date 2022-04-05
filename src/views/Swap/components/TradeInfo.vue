<template>
  <div>{{ tradeInfoStr }}</div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType, toRef } from 'vue'
  import { parseWei } from '@/utils/bigNumber'
  import { SwapParams, TradeType } from '../hooks/useSwap'

  export default defineComponent({
    name: 'trade-info',
    props: {
      swapParams: {
        type: Object as PropType<SwapParams>,
        required: true,
      },
    },
    setup(props) {
      const tradeInfoStr = computed(() => {
        if (props.swapParams.tradeType === TradeType.EXACT_OUTPUT) {
          const amountInMaxStr = Number(parseWei(props.swapParams.amountInMax, 18).toPrecision(5)).toLocaleString(
            'en-En',
            {
              style: 'decimal',
            },
          )

          return `Maximum sold ${amountInMaxStr}`
        }

        const amountOutMinStr = Number(parseWei(props.swapParams.amountOutMin, 18).toPrecision(5)).toLocaleString(
          'en-En',
          {
            style: 'decimal',
          },
        )

        return `Minimum received ${amountOutMinStr}`
      })

      return { tradeInfoStr }
    },
  })
</script>
