<template>
  <connect-wallet-modal />
  <app-header />
  <router-view />
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { store } from '@/store/store'
  import AppHeader from '@/components/AppHeader'
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
    },
    components: {
      AppHeader,
      ConnectWalletModal,
    },
  })
</script>
