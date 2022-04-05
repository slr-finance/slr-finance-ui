import { useSwapRouterContract } from '@/hooks/contracts/useSwapRouterContract'
import { useSendTx } from '@/hooks/useSendTx'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { computed, unref } from 'vue'

export const useSwapTx = (path: MaybeRef<string[]>, amounts: MaybeRef<BigNumber[]>) => {
  const swapParams = computed(() => [unref(path), unref(amounts)])
  const routerContract = useSwapRouterContract()

  return useSendTx(routerContract, 'approve', swapParams)
}
