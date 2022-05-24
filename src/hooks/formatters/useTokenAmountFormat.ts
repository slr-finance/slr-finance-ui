import { unref, computed } from 'vue'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { tokenAmountFormat } from '@/utils/strFormat/tokenAmountFormat'

export const useTokenAmountFormat = (amount: MaybeRef<BigNumber | number>, symbol: MaybeRef<string> = '') => {
  return computed(() => tokenAmountFormat(unref(amount), unref(symbol)))
}
