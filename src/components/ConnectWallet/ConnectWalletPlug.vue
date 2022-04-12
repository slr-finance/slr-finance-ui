<template>
  <slot
    v-if="!isActivated || isIncorrectChainId"
    name="plug"
  >
    <ui-button
      :size="size"
      @click="open"
      class="w-full"
      variant="white"
    >
      {{ isIncorrectChainId && isActivated ? 'Wrong chain' : text }}
    </ui-button>
  </slot>

  <slot
    name="default"
    v-else
  />
</template>

<script lang="ts">
  import { CHAIN_ID } from '@/config/constants/chain'
  import { computed, defineComponent } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import UiButton from '@/components/ui/UiButton.vue'
  import { useConnectWalletModal } from './hooks/useConnectWalletModal'

  export default defineComponent({
    name: 'connect-wallet-plug',
    props: {
      text: {
        type: String,
        default: 'Connect Wallet',
      },
      size: {
        type: [Number, String],
        default: 48,
      },
    },
    setup() {
      const { open } = useConnectWalletModal()
      const { isActivated, chainId } = useEthers()
      const isIncorrectChainId = computed(() => chainId.value !== CHAIN_ID)

      return {
        open,
        isActivated,
        isIncorrectChainId,
      }
    },
    components: {
      UiButton,
    },
  })
</script>
