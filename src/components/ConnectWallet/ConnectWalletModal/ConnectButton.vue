<template>
  <button
    class="flex flex-col justify-center items-stretch bg-white bg-opacity-10 p-16 rounded-16 text-left hover:bg-opacity-[0.12] transition-colors duration-150 disabled:opacity-80 disabled:hover:bg-opacity-10"
  >
    <div class="flex justify-between items-center mb-16">
      <div class="bg-black rounded-full w-32 h-32 flex justify-center items-center">
        <wallet-icon
          :wallet-name="walletName"
          class="h-16 w-16"
        />
      </div>
      <div><slot /></div>
    </div>

    <div class="text-14 text-white leading-none mb-8">
      {{ label }}
    </div>
    <div class="text-12 text-white leading-125 text-opacity-60">
      {{ description }}
    </div>
  </button>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { WalletName } from '@/hooks/dapp/useWallet'
  import WalletIcon from '../WalletIcon'

  export default defineComponent({
    name: 'connect-button',
    props: {
      walletName: {
        type: String as PropType<WalletName>,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    components: {
      WalletIcon,
    },
  })
</script>
