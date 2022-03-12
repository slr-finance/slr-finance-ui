import { getReferralContract } from '@/utils/contracts/getReferralContract'
import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from 'vue-dapp'

export const useReferrerClaim = () => {
  const { signer } = useEthers()
  const referralContract = computed(() => getReferralContract(unref(signer)))

  return useSendTx(referralContract, 'referrerClaim')
}
