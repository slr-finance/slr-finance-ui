<template>
  <div class="flex-1 pt-ui-page-header-spacing pb-ui-page-bottom-spacing px-ui-page-spacing">
    <h1 class="text-white font-title mb-16 text-ui-page-title">
      <span class="text-white text-opacity-60">Dashboard</span>
      station
    </h1>

    <div class="grid gap-28 grid-cols-2">
      <div class="border border-gray-800 rounded-12 px-ui-page-inner-spacing py-24">
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
      </div>
      <div class="border border-gray-800 rounded-12 overflow-hidden">
        <iframe
          style="filter: contrast(2) brightness(0.85) hue-rotate(0deg) saturate(0.8)"
          width="100%"
          height="470"
          allowFullScreen
          frameBorder="0"
          scrolling="no"
          src="https://coinbrain.com/embed/0xd32d01a43c869edcd1117c640fbdcfcfd97d9d65?theme=dark&chart=1&trades=0"
        ></iframe>
      </div>
      <presale-information bage-text="ITO">
        <template #footer>
          <ui-button
            :to="{ name: 'presale' }"
            variant="violet"
            size="48"
            class="w-full mt-28"
          >
            Go to presale
          </ui-button>
        </template>
      </presale-information>
    </div>
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
  import PresaleInformation from '@/views/Presale/components/PresaleInformation'
  import UiButton from '@/components/ui/UiButton.vue'

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
    components: {
      PresaleInformation,
      UiButton,
    },
  })
</script>

<style
  lang="postcss"
  scoped
></style>
