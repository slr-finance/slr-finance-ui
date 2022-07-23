import { UiToastProps, UiToastType } from '../types'
import { createSharedComposable } from '@vueuse/core'
import { readonly, ref } from 'vue'

type UiToastState = UiToastProps & { id: number }

export const useUiToast = createSharedComposable(() => {
  const state = ref<UiToastState>({
    id: 0,
    content: '',
    type: UiToastType.SUCCESS,
  })
  const isShown = ref(false)

  const show = (toastState: UiToastProps) => {
    state.value = { ...toastState, id: state.value.id + 1 }
    isShown.value = true
  }

  const success = (props: Omit<UiToastProps, 'type'>) => {
    show({ ...props, type: UiToastType.SUCCESS })
  }
  const info = (props: Omit<UiToastProps, 'type'>) => {
    show({ ...props, type: UiToastType.INFO })
  }
  const error = (props: Omit<UiToastProps, 'type'>) => {
    show({ ...props, type: UiToastType.ERROR })
  }

  const hide = () => {
    isShown.value = false
  }

  return {
    show,
    hide,
    success,
    info,
    error,
    state: readonly(state),
    isShown: readonly(isShown),
  }
})
