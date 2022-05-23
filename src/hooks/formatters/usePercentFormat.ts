import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { unref, computed } from 'vue'
import { useNumberFormat } from './useNumberFormat'

export const usePercentFormat = (fraction: MaybeRef<BigNumber | number>) => {
  const percent = computed(() => {
    const fractionVal = unref(fraction)

    if (BigNumber.isBigNumber(fractionVal)) {
      return fractionVal.times(100).toNumber()
    }

    return fractionVal * 100
  })

  const percentStr = useNumberFormat(percent, {
    style: 'decimal',
    maximumFractionDigits: 2,
  })

  return computed(() => `${unref(percentStr)}%`)
}
