import { getStakingContract } from "@/utils/contracts/getStakingContract"
import { computed, unref } from "vue"
import { useEthers } from "vue-dapp"

export const useStakingContract = () => {
  const { signer } = useEthers()
  const stakingContract = computed(() => getStakingContract(unref(signer)))

  return stakingContract
}
