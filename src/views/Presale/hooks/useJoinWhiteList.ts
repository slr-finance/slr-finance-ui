import { getPresaleContract } from '@/utils/contracts/getPresaleContract'
import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from '@/hooks/dapp/useEthers'
import { getReferrerFromCookies } from '@/libs/referral'

export const useJoinWhiteList = () => {
  const { signer } = useEthers()
  const tokenContract = computed(() => getPresaleContract(unref(signer)))
  const joinParams = computed(() => [getReferrerFromCookies()])

  return useSendTx(tokenContract, 'join', joinParams)
}
