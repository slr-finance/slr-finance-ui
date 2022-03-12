import { getApy } from '@/utils/math/getApy'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { computed, unref } from 'vue'

export const useProfit = (amount: MaybeRef<BigNumber>, apr: MaybeRef<BigNumber>, times: MaybeRef<number>) => {
  const apy = computed(() => getApy(unref(apr), unref(times)))
  const profit = computed(() => apy.value.times(unref(amount)))

  return profit
}
