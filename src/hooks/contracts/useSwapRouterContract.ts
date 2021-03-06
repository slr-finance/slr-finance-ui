import { computed, markRaw } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { SwapRouter__factory } from '@/contracts'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useSignerOrProvider } from '@/hooks/dapp/useSignerOrProvider'

export const useSwapRouterContract = createSharedComposable(() => {
  const signerOrProvider = useSignerOrProvider()

  const swapRouterContract = computed(() =>
    markRaw(SwapRouter__factory.connect(contractsAddresses.ReferralService, signerOrProvider.value)),
  )

  return swapRouterContract
})
