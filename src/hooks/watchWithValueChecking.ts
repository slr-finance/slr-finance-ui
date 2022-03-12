import { Ref, watch } from 'vue'

export const watchWithValueChecking = <T, R>(
  valueRef: Ref<T>,
  handler: (v: T, isChangedValue: () => boolean) => Promise<R>,
) => {
  watch(
    valueRef,
    (value) => {
      const isChangedValue = () => value !== valueRef.value

      try {
        handler(value, isChangedValue)
      } catch (error) {
        console.error(error)
      }
    },
    { immediate: true },
  )
}
