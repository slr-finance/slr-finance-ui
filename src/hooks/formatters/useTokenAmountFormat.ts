import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { Ref, unref, computed } from 'vue'
import { useNumberFormat } from './useNumberFormat'

const fractionDigits = [
  { maxVal: 1, digits: 6 },
  { maxVal: 10, digits: 4 },
  { maxVal: 1000, digits: 2 },
  { maxVal: Number.POSITIVE_INFINITY, digits: 0 },
]

export const useTokenAmountFormat = (amount: MaybeRef<BigNumber | number>, symbol: string | Ref<string> = '') => {
  const options = computed(() => {
    const amountVal = unref(amount)
    let maximumFractionDigits: number

    if (BigNumber.isBigNumber(amountVal)) {
      maximumFractionDigits = fractionDigits.find(({ maxVal }) => amountVal.lt(maxVal))?.digits ?? 0
    } else {
      maximumFractionDigits = fractionDigits.find(({ maxVal }) => amountVal < maxVal)?.digits ?? 0
    }

    return {
      maximumFractionDigits,
      style: 'decimal',
    }
  })
  const amountStr = useNumberFormat(amount, options)

  return computed(() => {
    const symbolVal = unref(symbol)

    return `${unref(amountStr)}${symbolVal ? ` ${symbolVal}` : ''}`
  })
}
