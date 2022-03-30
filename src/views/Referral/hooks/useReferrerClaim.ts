import { getReferralContract } from '@/utils/contracts/getReferralContract'
import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from '@/hooks/dapp/useEthers'

export const useReferrerClaim = () => {
  const { signer } = useEthers()
  const referralContract = computed(() => getReferralContract(unref(signer)))

  return useSendTx(referralContract, 'referrerClaim')
}
