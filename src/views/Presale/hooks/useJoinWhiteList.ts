import { getPresaleContract } from '@/utils/contracts/getPresaleContract'
import { getReferrerFromCookies } from 'slr-finance-ui-share/src/libs/referral'
import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from '@/hooks/dapp/useEthers'

export const useJoinWhiteList = () => {
  const { signer } = useEthers()
  const tokenContract = computed(() => getPresaleContract(unref(signer)))
  const joinParams = computed(() => [getReferrerFromCookies()])

  return useSendTx(tokenContract, 'join', joinParams)
}
