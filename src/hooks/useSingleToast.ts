import { ref, unref } from 'vue'
import { useToast } from 'vue-toastification'
import { ToastID } from 'vue-toastification/dist/types/types'

export const useSingleToast = () => {
  const toast = useToast()
  const toastId = ref(null as ToastID | null)

  const clear = () => {
    const toastIdVal = unref(toastId)

    if (toastIdVal !== null) {
      toast.dismiss(toastIdVal)

      toastId.value = null
    }
  }

  return {
    clear,
    info(...params: Parameters<typeof toast['info']>) {
      clear()
      toastId.value = toast.info(...params)
    },
    error(...params: Parameters<typeof toast['error']>) {
      clear()
      toastId.value = toast.error(...params)
    },
    warning(...params: Parameters<typeof toast['warning']>) {
      clear()
      toastId.value = toast.warning(...params)
    },
    success(...params: Parameters<typeof toast['success']>) {
      clear()
      toastId.value = toast.success(...params)
    },
    toastId,
  }
}
