import { getErc20Contract } from '@/utils/contracts/getErc20Contract'
import { constants } from 'ethers'
import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { MaybeRef } from '@vueuse/core'
import { useEthers } from '@/hooks/dapp/useEthers'

export const useApprove = (tokenAddress: MaybeRef<string>, spender: MaybeRef<string>) => {
  const { signer } = useEthers()
  const tokenContract = computed(() => getErc20Contract(unref(tokenAddress), unref(signer)))
  const approveParams = computed(() => [unref(spender), constants.MaxUint256])

  return useSendTx(tokenContract, 'approve', approveParams)
}
