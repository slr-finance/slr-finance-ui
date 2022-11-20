import { POOLS_INFO, PoolType } from '@/config/constants/Pools'
import { MaybeRef } from '@vueuse/core'
import { computed, unref, ComputedRef } from 'vue'

export const usePoolInfo = (poolId: MaybeRef<number>): ComputedRef<PoolType | undefined> => {
  return computed(() => {
    const poolIdVal = unref(poolId)
    const findedPoolInfo = POOLS_INFO.find((poolInfo) => poolInfo.id === poolIdVal)

    return findedPoolInfo
  })
}
