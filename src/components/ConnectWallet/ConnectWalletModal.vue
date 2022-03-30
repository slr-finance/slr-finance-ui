<template>
  <ui-modal
    v-model="isOpen"
    max-width="400px"
  >
    <ui-galaxy-loader v-if="isLoading" />

    <div v-else-if="isOpenQr">
      <ui-qr :data="walletConnectUri" />
    </div>

    <div
      v-else
      class="flex flex-col space-y-32"
    >
      <button
        @click="handleConnectMetamask"
        class="flex justify-center items-center bg-white bg-opacity-10 px-16 py-40 rounded-12"
      >
        Metamask
      </button>
      <button
        @click="handleConnectWalletconnect"
        class="flex justify-center items-center bg-white bg-opacity-10 px-16 py-40 rounded-12"
      >
        WalletConnect
      </button>
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
  import { useConnectWalletModal } from './hooks/useConnectWalletModal'

  export default defineComponent({
    setup() {
      const { connect } = useWallet()
      const { isOpen } = useConnectWalletModal()
      const isLoading = ref(false)
      const isOpenQr = ref(false)
      const walletConnectUri = ref('')
      const metamaskDisabled = ref(true)
      const appUrl = 'https://slr.finance'

      onMounted(() => {
        metamaskDisabled.value = false
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
      }
    },
    components: {
      UiQr,
      UiModal,
      UiGalaxyLoader,
    },
  })
</script>
