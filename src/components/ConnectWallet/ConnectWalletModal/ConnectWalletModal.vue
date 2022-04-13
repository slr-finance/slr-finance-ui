<template>
  <ui-modal
    v-model="isOpen"
    label="Connect wallet"
    max-width="400px"
    :closable="!isLoading"
  >
    <div class="flex justify-center items-center">
      <transition
        name="fade"
        mode="out-in"
      >
        <connect-wallet-modal-content v-model:isLoading="isLoading" />
      </transition>
    </div>
  </ui-modal>
</template>

<script lang="ts">
  import { defineComponent, defineAsyncComponent, ref } from 'vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import UiModal from '@/components/ui/UiModal.vue'
  import NoInternetConnection from '@/components/NoInternetConnection.vue'
  import { useConnectWalletModal } from '../hooks/useConnectWalletModal'

  export default defineComponent({
    setup() {
      const { isOpen } = useConnectWalletModal()
      const isLoading = ref(false)

      return {
        isOpen,
        isLoading,
      }
    },
    components: {
      ConnectWalletModalContent: defineAsyncComponent({
        loader: () => import('./ConnectWalletModalContent.vue'),
        loadingComponent: UiGalaxyLoader,
        errorComponent: NoInternetConnection,
        delay: 200,
      }),
      UiModal,
    },
  })
</script>
