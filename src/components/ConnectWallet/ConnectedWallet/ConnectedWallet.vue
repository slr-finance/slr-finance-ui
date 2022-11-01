<template>
  <div class="bg-black/50 text-12 leading-none rounded-12 text-white pl-16 pr-6 h-48 flex justify-center items-center">
    <div v-if="!isFetching">{{ balanceStr }}</div>
    <div
      class="ml-8 bg-black text-white/60 rounded-10 h-36 px-8 flex justify-center items-center"
      @click="open"
    >
      {{ trimedAddress }}
      <div class="bg-bnb w-20 h-20 flex justify-center items-center ml-6 rounded-4">
        <ui-async-icon-bnb-chain class="text-white w-14 h-14" size="14"/>
      </div>
    </div>
    <connected-wallet-modal />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { shortenAddress } from '@/utils/address/shortenAddress'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { UiAsyncIconBnbChain } from '@slr-finance/uikit'
  import { useConnectedWalletModal } from '../hooks/useConnectedWalletModal'
  import ConnectedWalletModal from '../ConnectedWalletModal/ConnectedWalletModal.vue'

  export default defineComponent({
    name: 'connected-wallet',
    setup(props) {
      const { address } = useEthers()
      const trimedAddress = computed(() => shortenAddress(address.value, 4))
      const { isFetching, balance } = useSlrBalance()
      const balanceStr = useTokenAmountFormat(balance, 'SLR')
      const { open } = useConnectedWalletModal()

      return {
        trimedAddress,
        open,
        balanceStr,
        isFetching,
      }
    },
    components: {
      UiAsyncIconBnbChain,
      ConnectedWalletModal,
    },
  })
</script>
