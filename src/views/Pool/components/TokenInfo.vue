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
    <ui-poligon-button :to="{ name: 'swap' }"> Buy </ui-poligon-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import { useSlrPrice } from '@/store/hooks/useSlrPrice'
  import { useSlrLiquidityPrice } from '@/store/hooks/useSlrLiquidityPrice'
  import UiPoligonButton from '@/components/ui/UiPoligonButton.vue'

  export default defineComponent({
    name: 'token-info',
    setup() {
      const priceStr = useUsdFormat(useSlrPrice())
      const slrLiquidityPriceStr = useUsdFormat(useSlrLiquidityPrice())
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
