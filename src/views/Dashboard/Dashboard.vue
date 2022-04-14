<template>
  <div class="page-padding">
    <div>Dashboard</div>
    <div>totalBaybackStr: {{ totalBaybackStr }}</div>
    <div>currentBnbBalanceStr: {{ currentBnbBalanceStr }}</div>
    <div>totalLiquidityBurnedStr: {{ totalLiquidityBurnedStr }}</div>
    <div>totalWilkyWayRewardsStr: {{ totalWilkyWayRewardsStr }}</div>
    <div>totalWilkyWayInvestedStr: {{ totalWilkyWayInvestedStr }}</div>
    <div>pendingBuyBackAndBurnStr: {{ pendingBuyBackAndBurnStr }}</div>
    <div>pendingInvestStr: {{ pendingInvestStr }}</div>
    <div>liquidityPriceStr: {{ liquidityPriceStr }}</div>
    <div>slrPriceStr: {{ slrPriceStr }}</div>
    <div>totalStakedStr: {{ totalStakedStr }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import { useSlrLiquidityPrice } from '@/store/hooks/useSlrLiquidityPrice'
  import { useSlrPrice } from '@/store/hooks/useSlrPrice'
  import { useMilkyWayInfo } from './hooks/useMilkyWayInfo'
  import { useTotalStakedInAllPools } from '@/store/hooks/useTotalStakedInAllPools'

  export default defineComponent({
    setup() {
      const {
        totalBayback,
        currentBnbBalance,
        totalLiquidityBurned,
        totalWilkyWayRewards,
        totalWilkyWayInvested,
        pendingBuyBackAndBurn,
        pendingInvest,
      } = useMilkyWayInfo()
      const totalBaybackStr = useTokenAmountFormat(totalBayback, 'SLR')
      const currentBnbBalanceStr = useTokenAmountFormat(currentBnbBalance, 'BNB')
      const totalLiquidityBurnedStr = useTokenAmountFormat(totalLiquidityBurned, 'SLR/BNB')
      const totalWilkyWayRewardsStr = useTokenAmountFormat(totalWilkyWayRewards, 'BNB')
      const totalWilkyWayInvestedStr = useTokenAmountFormat(totalWilkyWayInvested, 'BNB')
      const pendingBuyBackAndBurnStr = useTokenAmountFormat(pendingBuyBackAndBurn, 'BNB')
      const pendingInvestStr = useTokenAmountFormat(pendingInvest, 'BNB')

      const liquidityPrice = useSlrLiquidityPrice()
      const liquidityPriceStr = useUsdFormat(liquidityPrice)
      const slrPrice = useSlrPrice()
      const slrPriceStr = useUsdFormat(slrPrice)

      const totalStaked = useTotalStakedInAllPools()
      const totalStakedStr = useTokenAmountFormat(totalStaked, 'SLR')

      return {
        totalBaybackStr,
        currentBnbBalanceStr,
        totalLiquidityBurnedStr,
        totalWilkyWayRewardsStr,
        totalWilkyWayInvestedStr,
        pendingBuyBackAndBurnStr,
        pendingInvestStr,

        liquidityPriceStr,
        slrPriceStr,

        totalStakedStr,
      }
    },
    components: {},
  })
</script>

<style
  lang="postcss"
  scoped
>
  .page-padding {
    padding-top: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding) + 80px);
  }
</style>
