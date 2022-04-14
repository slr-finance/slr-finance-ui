import { computed, ComputedRef } from 'vue'
import { BIG_ZERO } from '@/utils/bigNumber'
import { usePools } from './usePools'
import BigNumber from 'bignumber.js'

export const useTotalStakedInAllPools = (): ComputedRef<BigNumber> => {
  const pools = usePools()
  const totalStaked = computed(() =>
    Object.values(pools.value).reduce((sum, pool) => sum.plus(pool.totalStaked), BIG_ZERO),
  )

  return totalStaked
}
