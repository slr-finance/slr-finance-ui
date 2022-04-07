import { MaybeRef } from '@vueuse/core'
import { computed, unref } from 'vue'
import type { PoolType } from '../config/constants/Pools'
import { usePoolsInfo } from './usePoolsInfo'

export const useNextPool = (currentPool: MaybeRef<PoolType>) => {
  const pools = usePoolsInfo()

  const nextPool = computed(() => {
    const index = unref(currentPool).id

    return index < pools.length - 1 && index > -1 ? pools[index + 1] : undefined
  })

  return nextPool
}
