<template>
  <div class="flex flex-col min-h-full relative">
    <router-view />
    <app-float-button-container class="z-ui-page-content"/>
    <app-mobile-bottom-navigation v-if="!isDesktopLayout" />
  </div>
  <app-header />
  <app-footer v-if="isDesktopLayout"/>
  <social-modal-button v-if="isDesktopLayout" />
  <connected-wallet-modal />
  <connect-wallet-modal />
  <ui-toast />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch } from 'vue'
  import { useBreakpoints } from '@vueuse/core'
  import { UiHeaderType, useUiHeader } from '@slr-finance/uikit'
  import UiToast from '@/components/ui/UiToast'
  import AppHeader from '@/components/App/AppHeader/AppHeader.vue'
  import AppMobileBottomNavigation from '@/components/App/AppMobileBottomNavigation/AppMobileBottomNavigation.vue'
  import ConnectedWalletModal from '@/components/ConnectWallet/ConnectedWalletModal/ConnectedWalletModal.vue'
  import ConnectWalletModal from '@/components/ConnectWallet/ConnectWalletModal'
  import { useBlockInfo } from './hooks/useBlockInfo'
  import { LATEST_CONNECTED_PROVIDER } from '@/config/constants/localStorage'
  import { useWallet, WalletName } from './hooks/dapp/useWallet'
  import AppFloatButtonContainer from '@/components/App/AppFloatButton/AppFloatButtonContainer.vue'

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

      const { setHeaderType } = useUiHeader()

      watch(
        isDesktopLayout,
        (isDesktopVal) => setHeaderType(isDesktopVal ? UiHeaderType.DEFAULT_DESKTOP : UiHeaderType.DEFAULT_MOBILE),
        { immediate: true },
      )

      return {
        isDesktopLayout,
      }
    },
    components: {
      AppHeader,
      AppFooter: defineAsyncComponent({
        loader: () => import('@/components/App/AppFooter'),
      }),
      AppFloatButtonContainer,
      AppMobileBottomNavigation,
      ConnectWalletModal,
      ConnectedWalletModal,
      SocialModalButton: defineAsyncComponent({
        loader: () => import('@/components/SocialModalButton'),
      }),
      UiToast,
    },
  })
</script>
