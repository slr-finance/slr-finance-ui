import { computed, markRaw } from 'vue'
import { IRouter02__factory } from '@slr-finance/contracts'
import { createSharedComposable } from '@vueuse/core'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useSignerOrProvider } from '@/hooks/dapp/useSignerOrProvider'

export const useSwapRouterContract = createSharedComposable(() => {
  const signerOrProvider = useSignerOrProvider()

  const swapRouterContract = computed(() =>
    markRaw(IRouter02__factory.connect(contractsAddresses.ReferralService, signerOrProvider.value)),
  )

  return swapRouterContract
})
