import { MaybeRef } from '@vueuse/core'
import { computed, ComputedRef, unref } from 'vue'
import { PoolState, stakingModule } from '../modules/stakingModule'
import { store } from '../store'

type UsePoolReturns = ComputedRef<PoolState>

export const usePool = (poolId: MaybeRef<number>): UsePoolReturns => {
  stakingModule.register(store)

  const poolInfo = computed(() => stakingModule.getters.getPool(unref(poolId)))

  return poolInfo
}
