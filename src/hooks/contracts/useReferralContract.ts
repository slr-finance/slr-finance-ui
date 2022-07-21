import { computed, markRaw } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { Referral__factory } from '@/contracts'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useSignerOrProvider } from '@/hooks/dapp/useSignerOrProvider'

export const useReferralContract = createSharedComposable(() => {
  const signerOrProvider = useSignerOrProvider()

  const presaleContract = computed(() =>
    markRaw(Referral__factory.connect(contractsAddresses.ReferralService, signerOrProvider.value)),
  )

  return presaleContract
})
