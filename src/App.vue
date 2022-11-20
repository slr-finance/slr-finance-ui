<template>
  <app-header />
  <!-- <SlrHeader></SlrHeader> -->
  <DefaultLayout/>
  
  <connected-wallet-modal />
  <connect-wallet-modal />
  <ui-toast />
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { UiHeaderType, useUiHeader } from '@slr-finance/uikit'
  import UiToast from '@/components/ui/UiToast'
  import AppHeader from '@/components/App/AppHeader/AppHeader.vue'
  import ConnectedWalletModal from '@/components/ConnectWallet/ConnectedWalletModal/ConnectedWalletModal.vue'
  import ConnectWalletModal from '@/components/ConnectWallet/ConnectWalletModal'
  import { LATEST_CONNECTED_PROVIDER } from '@/config/constants/localStorage'
  import { useWallet, WalletName } from './hooks/dapp/useWallet'
  import DefaultLayout from '@/layout/DefaultLayout.vue'
  import { useAppBreakpoints } from '@/hooks/useAppBreakpoints'
  // @ts-ignore
  // import SlrHeader from 'slr-common/components/common/slr-header'

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

      const breakpoints = useAppBreakpoints()
      const { setHeaderType } = useUiHeader()

      watch(
        breakpoints.w580,
        (isDesktopVal) => setHeaderType(isDesktopVal ? UiHeaderType.DEFAULT_DESKTOP : UiHeaderType.DEFAULT_MOBILE),
        { immediate: true },
      )
    },
    components: {
      DefaultLayout,
      AppHeader,
      ConnectWalletModal,
      ConnectedWalletModal,
      UiToast,
      // SlrHeader,
    },
  })
</script>
