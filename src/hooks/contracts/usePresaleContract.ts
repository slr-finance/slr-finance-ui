import { computed, markRaw } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { Presale__factory } from '@/contracts'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useSignerOrProvider } from '@/hooks/dapp/useSignerOrProvider'

export const usePresaleContract = createSharedComposable(() => {
  const signerOrProvider = useSignerOrProvider()

  const presaleContract = computed(() =>
    markRaw(Presale__factory.connect(contractsAddresses.PresaleService, signerOrProvider.value)),
  )

  return presaleContract
})
