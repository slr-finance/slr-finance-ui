import { ref } from 'vue'

const isOpen = ref(false)

export const useConnectedWalletModal = () => {
  const open = () => {
    isOpen.value = true
  }
  const close = () => {
    isOpen.value = false
    document.body.style.overflow = 'initial'
  }

  return {
    isOpen,
    open,
    close,
  }
}
