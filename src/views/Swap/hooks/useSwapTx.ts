import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { useSwapRouterContract } from '@/hooks/contracts/useSwapRouterContract'
import { useEthers } from '@/hooks/dapp/useEthers'
import { useBlockInfo } from '@/hooks/useBlockInfo'
import { useSendTx } from '@/hooks/useSendTx'
import { MaybeRef } from '@vueuse/core'
import { BigNumber as BigNumberEthers } from 'ethers'
import { computed, toRef, unref } from 'vue'
import { SwapParams, TradeType } from './useSwap'

const useSwapParams = (swapParams: MaybeRef<SwapParams>) => {
  const { blockTimestamp } = useBlockInfo()
  const { address } = useEthers()
  const { amountIn, amountOutMin, tokenIn, tokenOut, tradeType } = unref(swapParams)

  const deadline = blockTimestamp.value + 60

  const swapOptions = computed(() => {
    let method: string
    let params: any[] = []
    let options = { value: BigNumberEthers.from(0) }
    if (tokenIn === contractsAddresses.BnbToken) {
      if (tradeType === TradeType.EXACT_INPUT) {
        method = 'swapExactETHForTokens'

        const path = [tokenIn, tokenOut]
        params = [amountOutMin, path, address.value, deadline]

        options.value = amountIn
      } else {
        method = 'swapETHForExactTokens'

        const path = [tokenOut, tokenIn]
        params = [amountOutMin, path, address.value, deadline]

        options.value = BigNumberEthers.from(0)
      }
    } else if (tokenOut === contractsAddresses.BnbToken) {
      if (tradeType === TradeType.EXACT_INPUT) {
        method = 'swapExactTokensForETHSupportingFeeOnTransferTokens'

        const path = [tokenIn, tokenOut]
        params = [amountOutMin, path, address.value, deadline]

        options.value = BigNumberEthers.from(0)
      } else {
        method = 'swapExactETHForTokensSupportingFeeOnTransferTokens' // возможно не верно

        const path = [tokenOut, tokenIn]
        params = [amountOutMin, path, address.value, deadline]

        options.value = amountIn
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
