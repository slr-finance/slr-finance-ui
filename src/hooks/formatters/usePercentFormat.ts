import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { unref, computed } from 'vue'
import { useNumberFormat } from './useNumberFormat'

export const usePercentFormat = (fraction: MaybeRef<BigNumber>) => {
  const percent = computed(() => unref(fraction).times(100))
  const percentStr = useNumberFormat(percent, {
    style: 'decimal',
    maximumFractionDigits: 2,
  })

  return computed(() => `${unref(percentStr)}%`)
}
