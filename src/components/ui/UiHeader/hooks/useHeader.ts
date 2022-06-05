import { ref, watch } from 'vue'

const size = ref({
  height: 0,
  offset: 0,
})

if (typeof window !== 'undefined') {
  watch(size, ({ height, offset }) => {
    if (window?.document) {
      window.document.documentElement.style.setProperty('--app-ui-header-height', `${height}px`)
      window.document.documentElement.style.setProperty('--app-ui-header-offset', `${offset}px`)
    }
  })
}

export enum HeaderType {
  DEFAULT_DESKTOP,
  DEFAULT_MOBILE,
}

export const useHeader = () => {
  const setHeaderType = (type: HeaderType) => {
    size.value =
      type == HeaderType.DEFAULT_DESKTOP
        ? {
            height: 96,
            offset: 64,
          }
        : {
            height: 72,
            offset: 16,
          }
  }

  return {
    size,
    setHeaderType,
  }
}
