<template>
  <div class="w-full">
    <transition name="fade">
      <ui-galaxy-loader
        v-if="isLoading"
        class="backdrop-blur-4 absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"
      />
    </transition>

    <!-- <div v-if="isOpenQr">
      <client-only>
        <ui-qr
          :data="walletConnectUri"
          class="w-full rounded-8"
        />
      </client-only>

      <walletconnect-mobile-deep-link
        wallet="metamask"
        :uri="walletConnectUri"
      />

      <walletconnect-mobile-deep-link
        wallet="trustwallet"
        :uri="walletConnectUri"
      />
    </div> -->

    <div
      class="flex flex-col space-y-16"
    >
      <connect-button
        @click="handleConnectMetamask"
        label="Metamask"
        :walletName="WalletName.metamask"
        description="One of the most secure wallets with great flexibility"
        :disabled="checkingMetamask"
      >
        <transition name="fade">
          <span
            v-if="metamaskDisabled && !checkingMetamask"
            class="text-violet"
          >
            Install
          </span>
        </transition>
      </connect-button>
      <!-- <connect-button
        @click="handleConnectWalletconnect"
        label="WalletConnect"
        iconName="walletConnect"
        description="Connect wallet with QR code scanning or deep linking."
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
  import type { IQRCodeModal } from '@walletconnect/types'
  import { defineAsyncComponent, defineComponent, onMounted, ref, watch } from 'vue'
  import { useVModel } from '@vueuse/core'
  import { useWallet, WalletName } from '@/hooks/dapp/useWallet'
  import { NETWORK_DETAILS } from '@/config/constants/chain'
  import { UiGalaxyLoader } from '@slr-finance/uikit'
  import { useConnectWalletModal } from '../hooks/useConnectWalletModal'
  import ConnectButton from './ConnectButton.vue'
  import { Metamask } from '@/utils/wallet/Metamask'
  import WalletconnectMobileDeepLink from './WalletconnectMobileDeepLink.vue'

  export default defineComponent({
    props: {
      isLoading: {
        type: Boolean,
      },
    },
    emits: ['update:isLoading'],
    setup(props, { emit }) {
      const { connect } = useWallet()
      const { isOpen } = useConnectWalletModal()
      const checkingMetamask = ref(true)
      const isLoading = useVModel(props, 'isLoading', emit, { passive: true })
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
          await connect(WalletName.metamask)
        } catch (error) {
          console.log(error)
        } finally {
          close()
        }
      }

      const handleConnectWalletconnect = async () => {
        try {
          openLoading()
          await connect(WalletName.walletconnect, {
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
        WalletName
      }
    },
    components: {
      UiQr: defineAsyncComponent({
        loader: () => import('@/components/ui/UiQr.vue'),
        loadingComponent: UiGalaxyLoader,
      }),
      UiGalaxyLoader,
      ConnectButton,
      WalletconnectMobileDeepLink,
    },
  })
</script>
