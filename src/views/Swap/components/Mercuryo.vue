<template>
  <div class="grid grid-rows-3 875:grid-cols-3 mt-32 gap-12">
    <ui-button
      :disabled="!isActivated"
      :href="mercuryoLinkBuy"
      variant="gray"
      :size="48"
      target="_blank"
    >
      <ui-async-icon-card-visa class="mr-4 w-16 h-16"/>
      <ui-async-icon-card-mastercard class="mr-6 w-16 h-16"/>
      Buy bnb on Mercuryo
    </ui-button>
    <ui-button
      :disabled="!isActivated"
      :href="mercuryoLinkSell"
      variant="gray"
      :size="48"
      target="_blank"
    >
      <ui-async-icon-card-visa class="mr-4 w-16 h-16"/>
      <ui-async-icon-card-mastercard class="mr-6 w-16 h-16"/>
      Sell bnb on Mercuryo
    </ui-button>
    <ui-button
      href="https://docs.slr.finance/buy-sell-crypto/binance"
      target="_blank"
      variant="gray"
      :size="48"
    >
      <ui-async-icon-card-binance class="mr-6 w-16 h-16"/>
      Sell/Buy crypto on Binance
    </ui-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { UiButton } from '@slr-finance/uikit'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { UiAsyncIconCardBinance, UiAsyncIconCardMastercard, UiAsyncIconCardVisa } from '@slr-finance/uikit'

  export default defineComponent({
    name: 'mercuryo',
    setup() {
      const { address, isActivated } = useEthers()

      const mercuryoLinkSell = computed(() => {
        let link = 'https://exchange.mercuryo.io/?'
        // link += `fiat_amount=100&`
        link += `fiat_currency=USD&`
        // link += `amount=0.028453913160581980&`
        link += `currency=BNB&`
        link += `address=${address.value}&`
        // link += `hide_address=true&`
        link += `fix_currency=true&`
        link += `type=sell&`
        link += `returnUrl=https://app.slr.finance/swap`
        return link
      })

      const mercuryoLinkBuy = computed(() => {
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

      return { mercuryoLinkSell, mercuryoLinkBuy, isActivated }
    },
    components: {
      UiButton,
      UiAsyncIconCardBinance,
      UiAsyncIconCardMastercard,
      UiAsyncIconCardVisa,
    },
  })
</script>
