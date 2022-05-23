import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { useSwapRouterContract } from '@/hooks/contracts/useSwapRouterContract'
import { useEthers } from '@/hooks/dapp/useEthers'
import { useBlockInfo } from '@/hooks/useBlockInfo'
import { useSendTx } from '@/hooks/useSendTx'
import { MaybeRef } from '@vueuse/core'
import { BigNumber as BigNumberEthers } from 'ethers'
import { computed, unref } from 'vue'
import { SwapParams, TradeType } from './useSwap'

const useSwapParams = (swapParams: MaybeRef<SwapParams>) => {
  const { blockTimestampSync } = useBlockInfo()
  const { address } = useEthers()

  const swapOptions = computed(() => {
    const { amountIn, amountOut, amountOutMin, tokenIn, tokenOut, tradeType, amountInMax } = unref(swapParams)

    let method: string
    let params: any[] = []
    let options = { value: BigNumberEthers.from(0) }
    const deadline = blockTimestampSync.value + 60

    if (tokenIn === contractsAddresses.BnbToken) {
      if (tradeType === TradeType.EXACT_INPUT) {
        method = 'swapExactETHForTokensSupportingFeeOnTransferTokens'

        const path = [tokenIn, tokenOut]
        params = [amountOutMin, path, address.value, deadline]

        options.value = amountIn
      } else {
        method = 'swapETHForExactTokens'

        const path = [tokenIn, tokenOut]
        params = [amountOutMin, path, address.value, deadline]

        options.value = amountInMax
      }
    } else if (tokenOut === contractsAddresses.BnbToken) {
      if (tradeType === TradeType.EXACT_INPUT) {
        method = 'swapExactTokensForETHSupportingFeeOnTransferTokens'

        const path = [tokenIn, tokenOut]
        params = [amountIn, amountOutMin, path, address.value, deadline]

        options.value = BigNumberEthers.from(0)
      } else {
        method = 'swapTokensForExactETH' // возможно не верно

        const path = [tokenIn, tokenOut]
        params = [amountOut, amountInMax, path, address.value, deadline]

        options.value = BigNumberEthers.from(0)
      }
    } else {
      throw new Error()
    }

    return {
      method,
      params,
      options,
    }
  })

  return {
    method: computed(() => swapOptions.value.method),
    params: computed(() => swapOptions.value.params),
    options: computed(() => swapOptions.value.options),
  }
}

export const useSwapTx = (swapParams: MaybeRef<SwapParams>) => {
  const { method, params, options } = useSwapParams(swapParams)
  const routerContract = useSwapRouterContract()

  return useSendTx(routerContract, method, params, options)
}
