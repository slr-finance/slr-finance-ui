<template>
  <connect-wallet-plug
    :size="buttonSize"
    :text="connectWalletText"
  >
    <connected-wallet-mobile v-if="isMobile" />
    <connected-wallet v-else />
  </connect-wallet-plug>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { shortenAddress } from '@/utils/address/shortenAddress'
  import { UiButton } from '@slr-finance/uikit'
  import ConnectWalletPlug from './ConnectWalletPlug.vue'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import UiIcon from '@/components/ui/UiIcon'
  import { useConnectedWalletModal } from './hooks/useConnectedWalletModal'
  import ConnectedWalletModal from './ConnectedWalletModal/ConnectedWalletModal.vue'
  import ConnectedWalletAsync from './ConnectedWallet/ConnectedWalletAsync'
  import ConnectedWalletMobile from './ConnectedWallet/ConnectedWalletMobile.vue'

  export default defineComponent({
    name: 'connect-wallet',
    props: {
      isMobile: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const { address, chainId } = useEthers()
      const trimedAddress = computed(() => shortenAddress(address.value, props.isMobile ? 2 : 4))
      const isCorrectChainId = computed(() => chainId.value === 97)
      const { balance } = useSlrBalance()
      const balanceStr = useTokenAmountFormat(balance, 'SLR')
      const buttonSize = computed(() => (props.isMobile ? 36 : 48))
      const connectWalletText = computed(() => (props.isMobile ? 'Connect' : 'Connect Wallet'))
      const { open } = useConnectedWalletModal()

      return {
        isCorrectChainId,
        trimedAddress,
        open,
        balanceStr,
        buttonSize,
        connectWalletText,
      }
    },
    components: {
      UiButton,
      ConnectWalletPlug,
      UiIcon,
      ConnectedWalletModal,
      ConnectedWallet: ConnectedWalletAsync,
      ConnectedWalletMobile,
    },
  })
</script>
