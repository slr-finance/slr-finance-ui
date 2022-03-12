import { Ref, unref } from 'vue'

type AsyncHelpers = {
  breakIfValueChanged: () => void
  isBreakError: (error: any) => boolean
  isValueChanged: () => boolean
  isNilValue: () => boolean
  breakIfValueIsNil: () => void
  BreakError: typeof BreakError
}

class BreakError {}

export const runAsyncWithParamChecking = async <T, R>(
  valueRef: Ref<T>,
  asyncFunc: (value: T, helpers: AsyncHelpers) => Promise<R>,
) => {
  const value = unref(valueRef)
  const helpers: AsyncHelpers = {
    isValueChanged: () => unref(valueRef) !== value,
    isBreakError: (error) => error instanceof BreakError,
    isNilValue: () => !unref(valueRef),
    breakIfValueIsNil: () => {
      if (helpers.isNilValue()) {
        throw new BreakError()
      }
    },
    breakIfValueChanged: () => {
      if (helpers.isValueChanged()) {
        throw new BreakError()
      }
    },
    BreakError: BreakError,
  }

  try {
    const result = await asyncFunc(value, helpers)

    return result
  } catch (error) {
    if (!helpers.isBreakError(error)) {
      throw error
    }
  }
}
