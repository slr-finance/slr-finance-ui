<template>
  <div class="flex justify-between items-center text-12 text-white">
    <div class="text-white text-opacity-60">Price</div>
    <div>1 {{ swapParams.tokenInSymbol }} = {{ priceStr }} {{ swapParams.tokenOutSymbol }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType, toRef } from 'vue'
  import { parseWei } from '@/utils/bigNumber'
  import { SwapParams, TradeType } from '../hooks/useSwap'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'

  export default defineComponent({
    name: 'trade-price',
    props: {
      swapParams: {
        type: Object as PropType<SwapParams>,
        required: true,
      },
    },
    setup(props) {
      const swapParams = toRef(props, 'swapParams')
      const price = computed(() =>
        parseWei(swapParams.value.amountOut, 18).div(parseWei(swapParams.value.amountIn, 18)),
      )
      const priceStr = useTokenAmountFormat(price)

      return {
        priceStr,
      }
    },
  })
</script>
