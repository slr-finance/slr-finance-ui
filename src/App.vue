<template>
  <connected-wallet-modal />
  <connect-wallet-modal />
  <app-header :is-desktop="isDesktopLayout" />

  <div class="flex flex-col min-h-full">
    <router-view />
    <app-mobile-bottom-navigation v-if="!isDesktopLayout" />
  </div>

  <social-modal-button v-if="isDesktopLayout" />
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

  export default defineComponent({
    props: {
      referral: {
        type: String,
      },
    },
    setup() {
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
