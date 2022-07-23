import { computed, ComputedRef } from 'vue'
import { BIG_ZERO } from '@/utils/bigNumber'
import { usePoolsState } from './usePoolsState'
import BigNumber from 'bignumber.js'

export const useTotalStakedInAllPools = (): ComputedRef<BigNumber> => {
  const pools = usePoolsState()
  const totalStaked = computed(() =>
    Object.values(pools.value).reduce((sum, pool) => sum.plus(pool.totalStaked), BIG_ZERO),
  )

  return totalStaked
}
