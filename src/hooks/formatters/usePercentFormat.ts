import { percentFormat } from '@/utils/strFormat/percentFormat'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { unref, computed } from 'vue'

export const usePercentFormat = (fraction: MaybeRef<BigNumber | number>) => {
  return computed(() => percentFormat(unref(fraction)))
}
