import { getStakingContract } from '@/utils/contracts/getStakingContract'
import { computed, unref } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'

export const useStakingContract = () => {
  const { signer } = useEthers()
  const stakingContract = computed(() => getStakingContract(unref(signer)))

  return stakingContract
}
