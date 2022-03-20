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
  import { getProvider } from '@/utils/contracts/getProvider'

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
      getProvider().on('block', () => stakingModule.actions.refetchStaker())
    },
    components: {
      AppHeader,
    },
  })
</script>

<style lang="postcss">
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
