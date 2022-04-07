import { MaybeRef } from '@vueuse/core'
import { computed, ComputedRef, unref } from 'vue'
import { PoolState, stakingModule } from '../modules/stakingModule'
import { store } from '../store'

type UsePoolReturns = ComputedRef<Record<number, PoolState>>

export const usePools = (): UsePoolReturns => {
  stakingModule.register(store)

  const poolsStates = computed(() => stakingModule.state.pools)

  return poolsStates
}
