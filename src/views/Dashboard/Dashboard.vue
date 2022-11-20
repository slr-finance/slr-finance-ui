<template>
  <div>
    <h1 class="text-white font-title mb-16 text-ui-page-title">
      <span class="text-white text-opacity-60">Dashboard</span>
      station
    </h1>

    <div class="grid gap-28 grid-cols-2">
      <dashboard-container class="col-span-2 875:col-span-1">
        <div>
          <div class="text-28 font-title leading-140">
            <span class="text-yellow">DEFI 3.0</span> financial protocol operating in BSC
          </div>
        </div>
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
      </dashboard-container>
      <presale-information  class="col-span-2 875:col-span-1" bage-text="ITO">
        <template #footer>
          <ui-button
            :to="{ name: 'presale' }"
            variant="violet"
            :size="48"
            class="w-full mt-28"
          >
            Go to presale
          </ui-button>
        </template>
      </presale-information>

      <dashboard-token-charts
        class="col-span-2"
        style="height: 800px" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useHead } from '@vueuse/head'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import { useSlrPrice } from '@/hooks/dapp/useSlrPrice'
  import { useMilkyWayInfo } from './hooks/useMilkyWayInfo'
  import { useTotalStakedInAllPools } from '@/views/Pool/hooks/useTotalStakedInAllPools'
  import { UiButton } from '@slr-finance/uikit'
  import PresaleInformation from '@/views/Presale/components/PresaleInformation'
  import DashboardTokenCharts from './components/DashboardTokenCharts.vue'
  import DashboardContainer from './components/DashboardContainer.vue'

  export default defineComponent({
    setup() {
      useHead({
        title: 'SLR Dashboard',
        meta: [
          {
            name: 'description',
            content: 'SLR Dashboard',
          },
        ],
      })

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

      const { slrPrice, slrLiquidityPrice } = useSlrPrice()
      const liquidityPriceStr = useUsdFormat(slrLiquidityPrice)
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
    components: {
      PresaleInformation,
      DashboardTokenCharts,
      UiButton,
      DashboardContainer,
    },
  })
</script>

<style
  lang="postcss"
  scoped
></style>
