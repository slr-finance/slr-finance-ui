import { Call, multicall } from '@/utils/contracts/multicall'
import { MaybeRef } from '@vueuse/core'
import { computed, ComputedRef, unref, watch } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'
import { balanceModule, TokenInfo } from '../modules/balanceModule'
import { store } from '../store'
import erc20Abi from '@/config/abi/Erc20.json'
import { BigNumber as BigNumberEthers } from 'ethers'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { isAddress } from 'ethers/lib/utils'
import { FetchingStatus } from '@/entities/common'

type UseBalanceReturns = [ComputedRef<TokenInfo>, () => Promise<void>]

export const useBalance = (tokenAddress: MaybeRef<string>): UseBalanceReturns => {
  balanceModule.register(store)
  const { address: userAddress } = useEthers()
  const balanceInfo = computed(() => balanceModule.getters.getTokenInfo(unref(tokenAddress)))
  const calls = computed<Call[]>(() => [
    {
      name: 'decimals',
      address: unref(tokenAddress),
    },
    {
      name: 'balanceOf',
      address: unref(tokenAddress),
      params: [unref(userAddress)],
    },
  ])

  const handleFetchBalance = async () => {
    if (isAddress(userAddress.value)) {
      balanceModule.mutations.fetchingBalance(unref(tokenAddress))
      const [[[decimals], [balanceRaw]]] = await multicall(erc20Abi, unref(calls))

      balanceModule.mutations.fetchedBalance({
        tokenAddress: unref(tokenAddress),
        balanceRaw,
        decimals,
      })
    } else {
      balanceModule.mutations.fetchedBalance({
        tokenAddress: unref(tokenAddress),
        balanceRaw: BigNumberEthers.from(0),
        decimals: 0,
      })
    }
  }

  watch(calls, handleFetchBalance)

  if (balanceInfo.value.fetchStatus === FetchingStatus.NONE) {
    handleFetchBalance()
  }

  return [balanceInfo, handleFetchBalance]
}

export const useSlrBalance = () => {
  return useBalance(contractsAddresses.SolarToken)
}
