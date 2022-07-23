import { useScrollLock } from '@vueuse/core'

/*
 * Если несколько раз вызвать useScrollLock, то может возникнуть ситуация когда скролл будет залочен до обновления страницы.
 * Поэтому используется такая обертка
 */

const isLocked = useScrollLock(import.meta.env.SSR ? null : document.body)

export const useBodyScrollLock = () => {
  return (value: boolean) => {
    if (typeof value === 'boolean' && value !== isLocked.value) {
      isLocked.value = value
    }
  }
}
