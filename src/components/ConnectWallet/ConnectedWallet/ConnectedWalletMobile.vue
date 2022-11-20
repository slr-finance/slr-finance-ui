<template>
  <div
    class="text-12 bg-black text-white/60 rounded-10 h-36 px-8 flex justify-center items-center"
    @click="open"
  >
    {{ trimedAddress }}

    <ui-icon-pixel-arrow class="text-white ml-4 w-8 h-8"/>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { shortenAddress } from '@/utils/address/shortenAddress'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { UiIconPixelArrow } from '@slr-finance/uikit'
  import { useConnectedWalletModal } from '../hooks/useConnectedWalletModal'

  export default defineComponent({
    name: 'connected-wallet-mobile',
    setup() {
      const { address } = useEthers()
      const { balance } = useSlrBalance()
      const trimedAddress = computed(() => shortenAddress(address.value, 2))
      const balanceStr = useTokenAmountFormat(balance, 'SLR')
      const { open } = useConnectedWalletModal()

      return {
        trimedAddress,
        open,
        balanceStr,
      }
    },
    components: { UiIconPixelArrow },
  })
</script>
