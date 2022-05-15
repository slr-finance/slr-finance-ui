import { ref, watch } from 'vue'

const defaultState = {
  height: 0,
  offset: 42,
}

const size = ref({ ...defaultState })

watch(size, ({ height, offset }) => {
  if (window?.document) {
    window.document.documentElement.style.setProperty('--app-ui-bottom-nav-height', `${height}px`)
    window.document.documentElement.style.setProperty('--app-ui-bottom-nav-offset', `${offset}px`)
  }
})

export enum HeaderType {
  DEFAULT_DESKTOP,
  DEFAULT_MOBILE,
}

export const useMobileBottomNavigation = () => {
  const setState = (visible: boolean) => {
    size.value = visible
      ? {
          height: 90,
          offset: 24,
        }
      : { ...defaultState }
  }

  return {
    size,
    setState,
  }
}
