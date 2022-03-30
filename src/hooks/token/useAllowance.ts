import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { computed, Ref, ref, unref, watch } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'
import { Call, multicall } from '@/utils/contracts/multicall'
import erc20Abi from '@/config/abi/Erc20.json'
import { parseWei } from '@/utils/bigNumber'
import { runAsyncWithParamChecking } from '../runAsyncWithParamChecking'

type UseAllowanceReturn = [() => Promise<void>, Ref<BigNumber>, Ref<boolean>]

export const useAllowance = (tokenAddress: MaybeRef<string>, spender: MaybeRef<string>): UseAllowanceReturn => {
  const { address: userAddress } = useEthers()
  const isFetching = ref(false)
  const allowance = ref(new BigNumber(0)) as Ref<BigNumber>
  const watchSource = computed(() => {
    if (unref(tokenAddress)) {
      return {
        tokenAddress: unref(tokenAddress),
        userAddress: unref(userAddress),
        spender: unref(spender),
      }
    }
  })

  const fetchAllowance = () =>
    runAsyncWithParamChecking(watchSource, async (addresses, { BreakError }) => {
      isFetching.value = true

      if (!addresses) {
        throw new BreakError()
      }

      const addressVal = unref(addresses.userAddress)

      if (!addressVal) {
        throw new BreakError()
      }

      const tokenAddressVal = unref(addresses.tokenAddress)

      if (!tokenAddressVal) {
        throw new BreakError()
      }

      const calls: Call[] = [
        {
          address: tokenAddressVal,
          name: 'decimals',
        },
        {
          address: tokenAddressVal,
          name: 'allowance',
          params: [addressVal, unref(spender)],
        },
      ]

      const [[decimalsResponse], [allowanceResponse]] = await multicall(erc20Abi, calls)
      allowance.value = parseWei(allowanceResponse, decimalsResponse)
      isFetching.value = false
    })

  watch(() => watchSource, fetchAllowance, { immediate: true })

  return [fetchAllowance, allowance, isFetching]
}
