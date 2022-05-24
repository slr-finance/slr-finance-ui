<template>
  <div class="flex flex-col">
    <div class="flex-1 mb-12">
      <p class="text-gray text-16 mb-12">Registration open</p>
      <p class="text-white font-title text-24 uppercase leading-none">You are registered</p>
    </div>
    <div class="bg-green-original bg-opacity-10 rounded-12 text-12 pb-12 pt-6 px-8 flex-shrink-0">
      <div class="420:flex 420:mb-12 mb-18">
        <div class="py-8 px-4 flex-1 mb-12 420:mb-0">
          <p class="text-green-original mb-6">Your BNB balance</p>
          <p class="text-white uppercase leading-none font-title">{{ bnbBalanceStr }}</p>
        </div>
        <div class="bg-green-original-gradient relative rounded-8 py-8 pr-4 pl-4 420:pl-16 flex-1">
          <div
            class="absolute top-0 left-1/2 420:top-1/2 420:left-0 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-green-original flex justify-center items-center"
          >
            <ui-icon
              class="text-white transform rotate-90 420:rotate-0"
              name="arrow-pixel"
              size="8"
              rotate="270"
            />
          </div>
          <p class="text-green-original mb-6">Your can buy</p>
          <p class="text-white uppercase leading-none font-title">{{ amountStr }}</p>
        </div>
      </div>

      <div class="420:flex 420:space-x-10">
        <a
          class="flex-1 h-40 bg-green-original text-white hover:bg-opacity-30 bg-opacity-20 rounded-8 text-9 px-10 flex justify-center items-center flex-shrink-0 mb-8"
          :href="mercuryoLinkBuy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ui-icon
            prefix="icon-card"
            name="visa"
            size="16"
            class="mr-4"
          />
          <ui-icon
            prefix="icon-card"
            name="mastercard"
            size="16"
            class="mr-6"
          />
          Buy BNB on Mercuryo
        </a>

        <a
          class="flex-1 h-40 bg-green-original text-white hover:bg-opacity-30 bg-opacity-20 rounded-8 text-12 px-10 flex justify-center flex-shrink-0 items-center mb-8"
          href="https://docs.slr.finance/buy-sell-crypto/binance"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ui-icon
            name="binance"
            prefix="icon-card"
            size="16"
            class="mr-6"
          />
          Buy BNB on Binance
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { computedEager } from '@vueuse/shared'
  import UiExternalLink from '@/components/ui/UiExternalLink.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { tokenAmountFormat } from '@/utils/strFormat/tokenAmountFormat'
  import { usePresale } from '../../hooks/usePresale'

  export default defineComponent({
    name: 'white-list-joined',
    setup() {
      const { balance, address } = useEthers()
      const { prices } = usePresale()
      const bnbBalanceStr = useTokenAmountFormat(balance, 'BNB')
      const amountStr = computed(() => tokenAmountFormat(balance.value.div(prices.value[0]), 'SLR'))
      const mercuryoLinkBuy = computedEager(() => {
        let link = 'https://exchange.mercuryo.io/?'
        // link += `fiat_amount=100&`
        link += `fiat_currency=USD&`
        // link += `amount=0.028453913160581980&`
        link += `currency=BNB&`
        link += `address=${address.value}&`
        // link += `hide_address=true&`
        link += `fix_currency=true&`
        link += `type=buy&`
        link += `returnUrl=https://app.slr.finance/swap`
        return link
      })

      return {
        bnbBalanceStr,
        amountStr,
        mercuryoLinkBuy,
      }
    },
    components: { UiIcon, UiExternalLink },
  })
</script>
