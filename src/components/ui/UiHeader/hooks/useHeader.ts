import { ref, Ref } from 'vue'

export enum HeaderType {
  DEFAULT_DESKTOP,
  DEFAULT_MOBILE,
}

const HEADER_SIZE = {
  [HeaderType.DEFAULT_DESKTOP]: {
    height: 96,
    offset: 64,
  },
  [HeaderType.DEFAULT_MOBILE]: {
    height: 72,
    offset: 16,
  },
}

const size = ref({
  height: 0,
  offset: 0,
})

const type = ref() as Ref<HeaderType|undefined>

export const useHeader = () => {
  const setHeaderType = (headerType: HeaderType) => {
    const headerSize = HEADER_SIZE[headerType]
    type.value = headerType
    size.value = headerSize

    if (typeof window !== 'undefined' && window.document) {
      window.document.documentElement.style.setProperty('--app-ui-header-height', `${headerSize.height}px`)
      window.document.documentElement.style.setProperty('--app-ui-header-offset', `${headerSize.offset}px`)
    }
  }

  return {
    size,
    type,
    setHeaderType,
  }
}
