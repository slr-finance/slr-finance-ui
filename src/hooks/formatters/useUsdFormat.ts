import { computed, unref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { usdFormat } from '@/utils/strFormat/usdFormat'

export const useUsdFormat = (amount: MaybeRef<BigNumber | number>) => {
  return computed(() => usdFormat(unref(amount)))
}
