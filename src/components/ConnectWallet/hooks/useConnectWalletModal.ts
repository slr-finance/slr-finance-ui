import { ref } from 'vue'

const isOpen = ref(false)

export const useConnectWalletModal = () => {
  const open = () => {
    isOpen.value = true
  }
  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    open,
    close,
  }
}
