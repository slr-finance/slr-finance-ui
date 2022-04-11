<template>
  <div class="flex justify-between items-center text-12 text-white">
    <div class="text-white text-opacity-60">{{ tradeInfo.label }}</div>
    <div>{{ tradeInfo.value }}</div>
  </div>
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
      const tradeInfo = computed(() => {
        if (props.swapParams.tradeType === TradeType.EXACT_OUTPUT) {
          const amountInMaxStr = Number(parseWei(props.swapParams.amountInMax, 18).toPrecision(5)).toLocaleString(
            'en-En',
            {
              style: 'decimal',
            },
          )

          return {
            label: 'Maximum sold',
            value: amountInMaxStr,
          }
        }

        const amountOutMinStr = Number(parseWei(props.swapParams.amountOutMin, 18).toPrecision(5)).toLocaleString(
          'en-En',
          {
            style: 'decimal',
          },
        )

        return {
          label: 'Minimum received',
          value: amountOutMinStr,
        }
      })

      return { tradeInfo }
    },
  })
</script>
