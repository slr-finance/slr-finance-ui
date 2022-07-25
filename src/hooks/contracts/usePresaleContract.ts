import { computed, markRaw } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { PresaleService__factory } from '@slr-finance/contracts'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useSignerOrProvider } from '@/hooks/dapp/useSignerOrProvider'

export const usePresaleContract = createSharedComposable(() => {
  const signerOrProvider = useSignerOrProvider()

  const presaleContract = computed(() =>
    markRaw(PresaleService__factory.connect(contractsAddresses.PresaleService, signerOrProvider.value)),
  )

  return presaleContract
})
