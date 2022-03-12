import { MaybeRef } from '@vueuse/core'
import { computed, Ref, ref, unref } from 'vue'
import BigNumber from 'bignumber.js'
import { useEthers } from 'vue-dapp'
import { getErc20Contract } from '@/utils/contracts/getErc20Contract'
import { useDecimals } from './useDecimals'

export type UseBalanceReturns = [() => Promise<void>, Ref<BigNumber>, Ref<boolean>]

export const useBalance = (tokenAddress: MaybeRef<string>): UseBalanceReturns => {
  const contract = computed(() => getErc20Contract(unref(tokenAddress)))
  const [decimals, isFetchingDecimals] = useDecimals(tokenAddress)
  const { address: userAddress } = useEthers()
  const balanceRaw = ref(new BigNumber(0))
  const isFetchingBalance = ref(false)
  const isFetching = computed(() => unref(isFetchingDecimals) || unref(isFetchingBalance))
  const fetchBalance = async () => {
    isFetchingBalance.value = true
    const balanceBnEthers = await unref(contract).function.balanceOf(unref(userAddress))
    balanceRaw.value = new BigNumber(balanceBnEthers._hex)
    isFetchingBalance.value = false
  }
  const balance = computed(() => (isFetching ? new BigNumber(0) : unref(balanceRaw).div(unref(decimals))))

  return [fetchBalance, balance, isFetching]
}
