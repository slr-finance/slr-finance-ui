<template>
  <ui-modal
    v-model="isOpen"
    label="Connect wallet"
    max-width="400px"
  >
    <ui-galaxy-loader v-if="isLoading" />

    <div v-else-if="isOpenQr">
      <ui-qr :data="walletConnectUri" />
    </div>

    <div
      v-else
      class="flex flex-col space-y-16"
    >
      <connect-button
        @click="handleConnectMetamask"
        label="Metamask"
        iconName="metamask"
        description="One of the most secure wallets with great flexibility"
        :disabled="checkingMetamask"
      >
        <transition name="fade">
          <span
            v-if="metamaskDisabled && !checkingMetamask"
            class="text-purple"
          >
            Install
          </span>
        </transition>
      </connect-button>
      <connect-button
        @click="handleConnectWalletconnect"
        label="WalletConnect"
        iconName="walletConnect"
        description="Connect wallet with QR code scanning or deep linking."
      />
    </div>
  </ui-modal>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watch } from 'vue'
  import { useWallet } from '@/hooks/dapp/useWallet'
  import { NETWORK_DETAILS } from '@/config/constants/chain'
  import { IQRCodeModal } from '@walletconnect/types'
  import UiQr from '@/components/ui/UiQr.vue'
  import UiModal from '@/components/ui/UiModal.vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import { useConnectWalletModal } from '../hooks/useConnectWalletModal'
  import ConnectButton from './ConnectButton.vue'
  import { Metamask } from '@/utils/wallet/Metamask'

  export default defineComponent({
    setup() {
      const { connect } = useWallet()
      const { isOpen } = useConnectWalletModal()
      const checkingMetamask = ref(true)
      const isLoading = ref(false)
      const isOpenQr = ref(false)
      const walletConnectUri = ref('')
      const metamaskDisabled = ref(true)
      const appUrl = 'https://slr.finance'

      onMounted(async () => {
        if (await Metamask.check()) {
          metamaskDisabled.value = false
        }

        checkingMetamask.value = false
      })

      watch(isOpen, (isOpenVal) => {
        if (!isOpenVal) {
          isOpenQr.value = false
        }
      })

      const close = () => {
        isOpen.value = false
        isLoading.value = false
      }

      const openLoading = () => {
        isLoading.value = true
      }

      const walletConnectQr: IQRCodeModal = {
        open: (uri) => {
          walletConnectUri.value = uri
          isOpenQr.value = true
          isLoading.value = false
        },
        close,
      }

      const handleConnectMetamask = async () => {
        if (checkingMetamask.value) {
          return
        }

        if (metamaskDisabled.value && appUrl) {
          window.open(`https://metamask.app.link/dapp/${appUrl}`, '_blank')
          return
        } else if (metamaskDisabled.value) {
          return
        }
        // Prevent from closing the board while clicking disabled wallet
        openLoading()
        try {
          await connect('metamask')
        } catch (error) {
          console.log(error)
        } finally {
          close()
        }
      }

      const handleConnectWalletconnect = async () => {
        try {
          openLoading()
          await connect('walletconnect', {
            bridge: 'https://bridge.walletconnect.org', // Required
            qrcodeModal: walletConnectQr,
            rpc: Object.entries(NETWORK_DETAILS).reduce((chainMap, [chainId, chainInfo]) => {
              chainMap[Number(chainInfo.chainId)] = chainInfo.rpcUrls[0]

              return chainMap
            }, {} as Record<number, string>),
          })
        } catch (error) {
          console.error(error)
        }

        close()
      }

      return {
        handleConnectMetamask,
        handleConnectWalletconnect,
        isOpen,
        isOpenQr,
        isLoading,
        walletConnectUri,
        metamaskDisabled,
        checkingMetamask,
      }
    },
    components: {
      UiQr,
      UiModal,
      UiGalaxyLoader,
      ConnectButton,
    },
  })
</script>
