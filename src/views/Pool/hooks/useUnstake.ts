import { useStakingContract } from "@/hooks/contracts/useStakingContract"
import { useSendTx } from "@/hooks/useSendTx"
import { MaybeRef } from "@vueuse/core"
import { computed, unref } from "vue"

export const useUnstake = (poolId: MaybeRef<number>) => {
  const stakingContract = useStakingContract()
  const params = computed(() => [unref(poolId)])

  return useSendTx(stakingContract, 'unstake', params)
}
