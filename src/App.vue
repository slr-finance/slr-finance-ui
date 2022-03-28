<template>
  <vdapp-board />
  <app-header />
  <router-view />
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { useEthers } from 'vue-dapp'
  import { store } from '@/store/store'
  import AppHeader from '@/components/AppHeader.vue'
  import { stakingModule } from '@/store/modules/stakingModule'

  export default defineComponent({
    props: {
      referral: {
        type: String,
      },
    },
    setup() {
      const { address } = useEthers()
      stakingModule.register(store)
      watch(address, (addressVal) => stakingModule.actions.setStakerAddress(addressVal))

      import('@/utils/contracts/getProvider').then(({ getProvider }) => {
        getProvider().on('block', () => stakingModule.actions.refetchStaker())
      })
    },
    components: {
      AppHeader,
    },
  })
</script>
