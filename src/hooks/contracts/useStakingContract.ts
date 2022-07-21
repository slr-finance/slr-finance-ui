import { computed, markRaw } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { Staking__factory } from '@/contracts'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useSignerOrProvider } from '@/hooks/dapp/useSignerOrProvider'

export const useStakingContract = createSharedComposable(() => {
  const signerOrProvider = useSignerOrProvider()

  const stakingContract = computed(() =>
    markRaw(Staking__factory.connect(contractsAddresses.StakingService, signerOrProvider.value)),
  )

  return stakingContract
})
