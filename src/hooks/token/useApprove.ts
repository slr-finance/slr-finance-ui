import { constants } from 'ethers'
import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useErc20Contract } from '@/hooks/contracts/useErc20Contract'
import { MaybeRef } from '@vueuse/core'

export const useApprove = (tokenAddress: MaybeRef<string>, spender: MaybeRef<string>) => {
  const tokenContract = useErc20Contract(tokenAddress)
  const approveParams = computed(() => [unref(spender), constants.MaxUint256])

  return useSendTx(tokenContract, 'approve', approveParams)
}
