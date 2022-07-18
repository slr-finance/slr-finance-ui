import { useToggle } from '@vueuse/core'

const [isOpen, toggle] = useToggle()
const open = () => toggle(true)
const close = () => toggle(false)

export const useConnectedWalletModal = () => {
  return {
    isOpen,
    open,
    close,
  }
}
