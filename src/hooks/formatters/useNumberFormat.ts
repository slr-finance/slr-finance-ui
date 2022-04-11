import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { computed, unref } from 'vue'

export const useNumberFormat = (
  bignumber: MaybeRef<BigNumber | number>,
  options: MaybeRef<Intl.NumberFormatOptions> = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 6,
  },
) => {
  return computed(() => {
    const value = unref(bignumber)
    const optionsVal = unref(options)

    if (BigNumber.isBigNumber(value)) {
      return value.toNumber().toLocaleString('en-En', optionsVal)
    }
    return value.toLocaleString('en-En', optionsVal)
  })
}
