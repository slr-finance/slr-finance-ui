<template>
  <span>{{ priceStr }}</span>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { BIG_ONE } from '@/utils/bigNumber'
  import { usePresale } from '../hooks/usePresale'
  import { tokenAmountFormat } from '@/utils/strFormat/tokenAmountFormat'
  import { percentFormat } from '@/utils/strFormat/percentFormat'

  export default defineComponent({
    props: {
      phase: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const { prices, launchingPrice } = usePresale()

      const priceStr = computed(() => {
        const { phase } = props

        if (phase < 1 || phase > 3) {
          return '0'
        }

        const bnbPriceStr = tokenAmountFormat(BIG_ONE.div(prices.value[phase - 1]), 'SLR per 1 BNB')
        const discountStr = percentFormat(BIG_ONE.minus(prices.value[phase - 1].div(launchingPrice.value)))

        return `(discount ${discountStr}) ${bnbPriceStr}`
      })

      return { priceStr }
    },
  })
</script>
