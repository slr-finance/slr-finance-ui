<template>
  <div class="flex justify-between">
    <div>
      <div class="token-info-label">SLR Price</div>
      <div class="token-info-value">{{ priceStr }}</div>
    </div>
    <div>
      <div class="token-info-label">Total liquidity</div>
      <div class="token-info-value">{{ slrLiquidityPriceStr }}</div>
    </div>
    <ui-poligon-button
      :to="{ name: 'swap' }"
      variant="violet"
    >
      Buy
    </ui-poligon-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import { useSlrPrice } from '@/hooks/dapp/useSlrPrice'
  import UiPoligonButton from '@/components/ui/UiPoligonButton.vue'

  export default defineComponent({
    name: 'token-info',
    setup() {
      const { slrPrice, slrLiquidityPrice } = useSlrPrice()
      const priceStr = useUsdFormat(slrPrice)
      const slrLiquidityPriceStr = useUsdFormat(slrLiquidityPrice)

      return {
        priceStr,
        slrLiquidityPriceStr,
      }
    },
    components: { UiPoligonButton },
  })
</script>

<style lang="postcss">
  .token-info-label {
    @apply text-14 text-opacity-60 text-white mb-12 leading-140;
  }
  .token-info-value {
    @apply text-16 text-white leading-none;
  }
</style>
