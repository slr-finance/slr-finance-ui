import { useSwapRouterContract } from '@/hooks/contracts/useSwapRouterContract'
import { useEthers } from '@/hooks/dapp/useEthers'
import { useBlockInfo } from '@/hooks/useBlockInfo'
import { useSendTx } from '@/hooks/useSendTx'
import { MaybeRef } from '@vueuse/core'
import { computed, unref } from 'vue'
import { SwapParams, TradeType } from './useSwap'

export const useSwapTx = (path: MaybeRef<string[]>, swapParams: MaybeRef<SwapParams>) => {
  const { blockTimestamp } = useBlockInfo()
  const { address } = useEthers()
  const method = computed(() =>
    unref(swapParams).tradeType === TradeType.EXACT_INPUT ? 'swapExactTokensForTokens' : 'swapTokensForExactTokens',
  )
  const params = computed(() => {
    const swapParamsVal = unref(swapParams)
    const addressVal = unref(address)
    const pathVal = unref(path)
    const deadline = blockTimestamp.value + 60

    return swapParamsVal.tradeType === TradeType.EXACT_INPUT
      ? [swapParamsVal.amountIn, swapParamsVal.amountOutMin, pathVal, addressVal, deadline]
      : [swapParamsVal.amountOut, swapParamsVal.amountInMax, pathVal, addressVal, deadline]
  })
  const routerContract = useSwapRouterContract()

  return useSendTx(routerContract, method, params)
}
