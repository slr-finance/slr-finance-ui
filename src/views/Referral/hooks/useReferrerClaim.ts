import { useSendTx } from '@/hooks/useSendTx'
import { useReferralContract } from '@/hooks/contracts/useReferralContract'

export const useReferrerClaim = () => {
  const referralContract = useReferralContract()

  return useSendTx(referralContract, 'referrerClaim')
}
