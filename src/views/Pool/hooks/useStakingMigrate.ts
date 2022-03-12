import { useStakingContract } from "@/hooks/contracts/useStakingContract"
import { useSendTx } from "@/hooks/useSendTx"

export const useStakingMigrate = () => {
  const stakingContract = useStakingContract()

  return useSendTx(stakingContract, 'withdrawal')
}