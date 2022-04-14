import { unref, computed } from 'vue'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { findDigits } from './helpers'
import { useNumberFormat } from './useNumberFormat'

const fractionDigits = [
  { maxVal: 1, digits: 6 },
  { maxVal: 10, digits: 4 },
  { maxVal: 1000, digits: 2 },
  { maxVal: Number.POSITIVE_INFINITY, digits: 0 },
]

export const useTokenAmountFormat = (amount: MaybeRef<BigNumber | number>, symbol: MaybeRef<string> = '') => {
  const options = computed(() => {
    const amountVal = unref(amount)

    return {
      maximumFractionDigits: findDigits(fractionDigits, amountVal),
      style: 'decimal',
    }
  })
  const amountStr = useNumberFormat(amount, options)

  return computed(() => {
    const symbolVal = unref(symbol)

    return `${unref(amountStr)}${symbolVal ? ` ${symbolVal}` : ''}`
  })
}
