import { useToggle } from '@vueuse/core'

const [isOpen, toggle] = useToggle()

export const useConnectedWalletModal = () => {
  const open = () => toggle(true)
  const close = () => toggle(false)

  return {
    isOpen,
    open,
    close,
  }
}
