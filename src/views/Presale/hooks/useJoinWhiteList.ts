import { getPresaleContract } from '@/utils/contracts/getPresaleContract'
import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from '@/hooks/dapp/useEthers'
import { getReferrerFromLocalstorage } from '@/utils/getReferrerFromLocalstorage'

export const useJoinWhiteList = () => {
  const { signer } = useEthers()
  const tokenContract = computed(() => getPresaleContract(unref(signer)))
  const joinParams = computed(() => [getReferrerFromLocalstorage()])

  return useSendTx(tokenContract, 'join', joinParams)
}
