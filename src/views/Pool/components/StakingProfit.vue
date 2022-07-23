<template>
  <div class="ui-box-corners mb-24 cursor-default">
    <p class="text-14">
      Will be earned <span class="text-white">{{ profitStr }} ({{ profitInDollStr }})</span> for {{ daysStr }}
    </p>
    <p class="text-14 text-white/60">Early unlock penalty fee is {{ withdrawalFeeStr }}</p>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRef } from 'vue'
  import { useUsdPrice } from '@/hooks/useUsdPrice'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import { usePoolState } from '../hooks/usePoolState'
  import { useProfit } from '../hooks/useProfit'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import BigNumber from 'bignumber.js'

  export default defineComponent({
    name: 'staking-profit',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
      days: {
        type: Number,
        required: true,
      },
      amount: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
    },
    setup(props) {
      const [poolState] = usePoolState(toRef(props, 'poolId'))
      const amount = toRef(props, 'amount')

      const days = toRef(props, 'days')
      const daysStr = computed(() => {
        const daysValue = days.value

        return `${daysValue} days`
      })

      const apr = computed(() => poolState.value.apr)
      const withdrawalFee = computed(() => poolState.value.withdrawalFee)

      const profit = useProfit(amount, apr, days)
      const profitStr = useTokenAmountFormat(profit, 'SLR')
      const profitInDollStr = useUsdFormat(useUsdPrice(profit))
      const withdrawalFeeStr = usePercentFormat(withdrawalFee)

      return {
        amount,
        profitStr,
        profitInDollStr,
        withdrawalFeeStr,
        daysStr,
      }
    },
  })
</script>
