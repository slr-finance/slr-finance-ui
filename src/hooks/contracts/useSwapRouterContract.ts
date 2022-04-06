import { getSwapRouterContract } from '@/utils/contracts/getSwapRouterContract'
import { computed, markRaw, unref } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'

export const useSwapRouterContract = () => {
  const { signer } = useEthers()
  const swapRouterContract = computed(() => markRaw(getSwapRouterContract(unref(signer))))

  return swapRouterContract
}
