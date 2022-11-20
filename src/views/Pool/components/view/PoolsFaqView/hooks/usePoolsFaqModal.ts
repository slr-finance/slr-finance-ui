import { Ref } from 'vue'
import { useToggle } from '@vueuse/core'

const [isOpen, toggle] = useToggle(false)

export const usePoolsFaqModal = (): [Ref<boolean>, (value?: boolean) => boolean] => {
  return [isOpen, toggle]
}
