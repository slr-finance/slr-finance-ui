<template>
  <div class="grid grid-rows-3 875:grid-cols-3 mt-32 gap-12">
    <ui-button
      :disabled="!isActivated"
      :href="mercuryoLinkBuy"
      variant="gray"
      size="48"
      target="_blank"
    >
      <ui-icon
        prefix="ui-icon-card"
        name="visa"
        size="16"
        class="mr-4"
      />
      <ui-icon
        prefix="ui-icon-card"
        name="mastercard"
        size="16"
        class="mr-6"
      />
      Buy bnb on Mercuryo
    </ui-button>
    <ui-button
      :disabled="!isActivated"
      :href="mercuryoLinkSell"
      variant="gray"
      size="48"
      target="_blank"
    >
      <ui-icon
        prefix="ui-icon-card"
        name="visa"
        size="16"
        class="mr-4"
      />
      <ui-icon
        prefix="ui-icon-card"
        name="mastercard"
        size="16"
        class="mr-6"
      />
      Sell bnb on Mercuryo
    </ui-button>
    <ui-button
      href="https://docs.slr.finance/buy-sell-crypto/binance"
      target="_blank"
      variant="gray"
      size="48"
    >
      <ui-icon
        prefix="ui-icon-card"
        name="binance"
        size="16"
        class="mr-6"
      />
      Sell/Buy crypto on Binance
    </ui-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon'
  import { useEthers } from '@/hooks/dapp/useEthers'

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
      UiIcon,
    },
  })
</script>
