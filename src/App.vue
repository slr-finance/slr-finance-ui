<template>
  <div class="flex flex-col min-h-full">
    <router-view />
    <app-mobile-bottom-navigation v-if="!isDesktopLayout" />
  </div>

  <app-header />
  <social-modal-button v-if="isDesktopLayout" />
  <connected-wallet-modal />
  <connect-wallet-modal />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch } from 'vue'
  import { useBreakpoints } from '@vueuse/core'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { store } from '@/store/store'
  import AppHeader from '@/components/App/AppHeader/AppHeader.vue'
  import AppMobileBottomNavigation from '@/components/App/AppMobileBottomNavigation/AppMobileBottomNavigation.vue'
  import ConnectedWalletModal from '@/components/ConnectWallet/ConnectedWalletModal/ConnectedWalletModal.vue'
  import ConnectWalletModal from '@/components/ConnectWallet/ConnectWalletModal'
  import { stakingModule } from '@/store/modules/stakingModule'
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
      const { connect } = useWallet()

      const latestConnectedProvider = localStorage.getItem(LATEST_CONNECTED_PROVIDER) as WalletName | null

      if (latestConnectedProvider === 'metamask') {
        connect(latestConnectedProvider)
      }

      stakingModule.register(store)

      const { address } = useEthers()
      watch(address, (addressVal) => stakingModule.actions.setStakerAddress(addressVal))

      const { blockNumber } = useBlockInfo()
      watch(blockNumber, () => stakingModule.actions.refetchStaker())

      const { isDesktopLayout } = useBreakpoints({
        isDesktopLayout: 580,
      })

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
        loader: () => import('@/components/SocialModalButton'),
      }),
    },
  })
</script>
