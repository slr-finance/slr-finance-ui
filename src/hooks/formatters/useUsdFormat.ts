import { computed, unref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { findDigits } from './helpers'
import { useNumberFormat } from './useNumberFormat'

const fractionDigits = [
  { maxVal: 0.01, digits: 6 },
  { maxVal: 0.5, digits: 4 },
  { maxVal: 10000, digits: 2 },
  { maxVal: Number.POSITIVE_INFINITY, digits: 0 },
]

const minDispaly = 0.000001
const minDispalyStr = `> ${minDispaly.toLocaleString('en-En', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 6,
})}`

export const useUsdFormat = (amount: MaybeRef<BigNumber | number>) => {
  const options = computed(() => {
    const amountVal = unref(amount)

    return {
      maximumFractionDigits: findDigits(fractionDigits, amountVal),
      style: 'currency',
      currency: 'USD',
    }
  })
  const usdStr = useNumberFormat(amount, options)

  return computed(() => {
    const amountVal = unref(amount)

    if (BigNumber.isBigNumber(amountVal)) {
      if (amountVal.lt(minDispaly)) {
        return minDispalyStr
      }
    } else {
      if (amountVal < minDispaly) {
        return minDispalyStr
      }
    }

    return unref(usdStr)
  })
}
