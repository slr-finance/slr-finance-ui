import { MaybeRef } from '@vueuse/core'
import { computed, Ref, ref, unref } from 'vue'
import BigNumber from 'bignumber.js'
import { useEthers } from '@/hooks/dapp/useEthers'
import { useErc20Contract } from '@/hooks/contracts/useErc20Contract'
import { ethersToBigNumber } from '@/utils/bigNumber'
import { useDecimals } from './useDecimals'

export type UseBalanceReturns = [() => Promise<void>, Ref<BigNumber>, Ref<boolean>]

export const useBalance = (tokenAddress: MaybeRef<string>): UseBalanceReturns => {
  const tokenContract = useErc20Contract(tokenAddress)
  const [decimals, isFetchingDecimals] = useDecimals(tokenAddress)
  const { address: userAddress } = useEthers()
  const balanceRaw = ref(new BigNumber(0))
  const isFetchingBalance = ref(false)
  const isFetching = computed(() => unref(isFetchingDecimals) || unref(isFetchingBalance))
  const fetchBalance = async () => {
    isFetchingBalance.value = true
    const [balanceBnEthers] = await tokenContract.value.functions.balanceOf(unref(userAddress))
    balanceRaw.value = ethersToBigNumber(balanceBnEthers)
    isFetchingBalance.value = false
  }
  const balance = computed(() => (isFetching ? new BigNumber(0) : unref(balanceRaw).div(unref(decimals))))

  return [fetchBalance, balance, isFetching]
}
