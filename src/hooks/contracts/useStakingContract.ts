import { getStakingContract } from '@/utils/contracts/getStakingContract'
import { computed, markRaw, unref } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'

export const useStakingContract = () => {
  const { signer } = useEthers()
  const stakingContract = computed(() => markRaw(getStakingContract(unref(signer))))

  return stakingContract
}
