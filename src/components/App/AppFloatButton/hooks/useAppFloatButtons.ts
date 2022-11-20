import { createSharedComposable } from '@vueuse/core'
import { readonly, Ref, ref } from 'vue'

export const useAppFloatButtons = createSharedComposable(() => {
  const targetElement = ref(null) as Ref<HTMLElement|null>
  const setTargetElement = (element:HTMLElement|null) => {
    targetElement.value = element
  }

  return { 
    targetElement: readonly(targetElement),
    setTargetElement,
  }
})
