import { PoolState, usePoolsState } from '@/views/Pool/hooks/usePoolsState'
import { MaybeRef } from '@vueuse/core'
import { computed, ComputedRef, ref, Ref, unref } from 'vue'

type UsePoolReturns = [ComputedRef<PoolState>, Ref<boolean>]

export const usePoolState = (poolId: MaybeRef<number>): UsePoolReturns => {
  const {pools, isFetching} = usePoolsState()
  const poolState = computed(() => pools.value[unref(poolId)])

  return [ poolState, isFetching ]
}
