import { getSwapRouterContract } from '@/utils/contracts/getSwapRouterContract'
import { computed, unref } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'

export const useSwapRouterContract = () => {
  const { signer } = useEthers()
  const swapRouterContract = computed(() => getSwapRouterContract(unref(signer)))

  return swapRouterContract
}
