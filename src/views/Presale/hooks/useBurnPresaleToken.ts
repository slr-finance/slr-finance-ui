import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from '@/hooks/dapp/useEthers'
import { getPresaleContract } from '@/utils/contracts/getPresaleContract'

export const useBurnPresaleToken = () => {
  const { signer } = useEthers()
  const presaleContract = computed(() => getPresaleContract(unref(signer)))

  return useSendTx(presaleContract, 'burnAll')
}
