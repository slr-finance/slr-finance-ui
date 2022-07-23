import { computed } from 'vue'
import { getReferrerFromCookies } from '@slr-finance/ui-share'
import { useSendTx } from '@/hooks/useSendTx'
import { usePresaleContract } from '@/hooks/contracts/usePresaleContract'

export const useJoinWhiteList = () => {
  const presaleContract = usePresaleContract()
  const joinParams = computed(() => [getReferrerFromCookies()])

  return useSendTx(presaleContract, 'join', joinParams)
}
