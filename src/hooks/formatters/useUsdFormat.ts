import BigNumber from 'bignumber.js'
import { computed, Ref, unref } from 'vue'
import { useNumberFormat } from './useNumberFormat'

const toLocaleStringOptions = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
}

const minDispaly = 0.01
const minDispalyStr = `> ${minDispaly.toLocaleString('en-En', toLocaleStringOptions)}`

export const useUsdFormat = (bignumber: Ref<BigNumber>) => {
  const usdStr = useNumberFormat(bignumber, toLocaleStringOptions)

  return computed(() => (unref(bignumber).lt(minDispaly) ? minDispalyStr : unref(usdStr)))
}
