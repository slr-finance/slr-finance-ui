import { MaybeRef } from '@vueuse/core'
import { computed, unref } from 'vue'
import type { PoolType } from '../config/constants/Pools'
import { usePools } from './usePools'

export const useNextPool = (currentPool: MaybeRef<PoolType>) => {
  const pools = usePools()

  const nextPool = computed(() => {
    const index = unref(currentPool).id

    return index < pools.length - 1 && index > -1 ? pools[index + 1] : undefined
  })

  return nextPool
}
