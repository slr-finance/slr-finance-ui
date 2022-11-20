import { computed, ComputedRef, Ref } from 'vue'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useEthers } from '@/hooks/dapp/useEthers'
import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
import { SwapParams } from './useSwap'
import BigNumber from 'bignumber.js'

export const useSwapTokensBalance = (
  swapParams: Ref<SwapParams>,
): [ComputedRef<{ in: BigNumber; out: BigNumber }>, () => Promise<void>] => {
  const { balance: bnbBalance, fetchBalance: fetchBnbBalance } = useEthers()
  const { balance: slrBalance, refetchBalance } = useSlrBalance()
  const refetchBalances = async () => {
    await Promise.all([refetchBalance(), fetchBnbBalance()])
  }

  const tokensBalances = computed(() =>
    swapParams.value.tokenIn === contractsAddresses.SolarToken
      ? { in: slrBalance.value, out: bnbBalance.value }
      : { out: slrBalance.value, in: bnbBalance.value },
  )

  return [tokensBalances, refetchBalances]
}
