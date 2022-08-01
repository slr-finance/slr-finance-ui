<template>
  <div class="flex flex-col min-h-full">
    <router-view />
    <app-mobile-bottom-navigation v-if="!isDesktopLayout" />
  </div>

  <app-header />
  <social-modal-button v-if="isDesktopLayout" />
  <connected-wallet-modal />
  <connect-wallet-modal />
  <ui-toast />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch } from 'vue'
  import { useBreakpoints } from '@vueuse/core'
  import { HeaderType, useHeader } from '@/components/ui/UiHeader/hooks/useHeader'
  import UiToast from '@/components/ui/UiToast'
  import AppHeader from '@/components/App/AppHeader/AppHeader.vue'
  import AppMobileBottomNavigation from '@/components/App/AppMobileBottomNavigation/AppMobileBottomNavigation.vue'
  import ConnectedWalletModal from '@/components/ConnectWallet/ConnectedWalletModal/ConnectedWalletModal.vue'
  import ConnectWalletModal from '@/components/ConnectWallet/ConnectWalletModal'
  import { useBlockInfo } from './hooks/useBlockInfo'
  import { LATEST_CONNECTED_PROVIDER } from '@/config/constants/localStorage'
  import { useWallet, WalletName } from './hooks/dapp/useWallet'

  export default defineComponent({
    props: {
      referral: {
        type: String,
      },
    },
    setup() {
      if (!import.meta.env.SSR) {
        const { connect } = useWallet()

        const latestConnectedProvider = localStorage.getItem(LATEST_CONNECTED_PROVIDER) as WalletName | null

        if (latestConnectedProvider === 'metamask') {
          connect(latestConnectedProvider)
        }
      }

      const { isDesktopLayout } = useBreakpoints({
        isDesktopLayout: 580,
      })

      const { setHeaderType } = useHeader()

      watch(
        isDesktopLayout,
        (isDesktopVal) => setHeaderType(isDesktopVal ? HeaderType.DEFAULT_DESKTOP : HeaderType.DEFAULT_MOBILE),
        { immediate: true },
      )

      return {
        isDesktopLayout,
      }
    },
    components: {
      AppHeader,
      ConnectWalletModal,
      ConnectedWalletModal,
      AppMobileBottomNavigation,
      SocialModalButton: defineAsyncComponent({
        loader: () => import("@/components/SocialModalButton"),
      }),
      UiToast,
    },
  })
</script>
