import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { Ref, unref, computed, ComputedRef } from 'vue'
import { useNumberFormat } from './useNumberFormat'

export const useTokenAmountFormat = (
  bignumber: MaybeRef<BigNumber | number>,
  symbol: string | Ref<string> = '',
  maximumFractionDigits: number | Ref<number> = 6,
) => {
  const amountStr = useNumberFormat(bignumber, {
    style: 'decimal',
    maximumFractionDigits: unref(maximumFractionDigits),
  })

  return computed(() => `${unref(amountStr)}${unref(symbol) ? ` ${unref(symbol)}` : ''}`)
}
