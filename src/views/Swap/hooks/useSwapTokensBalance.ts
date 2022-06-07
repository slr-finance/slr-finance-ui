import { computed, ComputedRef, Ref } from 'vue'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useEthers } from '@/hooks/dapp/useEthers'
import { useSlrBalance } from '@/store/hooks/useBalance'
import { SwapParams } from './useSwap'
import BigNumber from 'bignumber.js'

export const useSwapTokensBalance = (
  swapParams: Ref<SwapParams>,
): [ComputedRef<{ in: BigNumber; out: BigNumber }>, () => Promise<void>] => {
  const { balance: bnbBalance, fetchBalance: fetchBnbBalance } = useEthers()
  const [slrTokenInfo, fetchBalance] = useSlrBalance()
  const refetchBalances = async () => {
    await Promise.all([fetchBalance(), fetchBnbBalance()])
  }

  const tokensBalances = computed(() =>
    swapParams.value.tokenIn === contractsAddresses.SolarToken
      ? { in: slrTokenInfo.value.balance, out: bnbBalance.value }
      : { out: slrTokenInfo.value.balance, in: bnbBalance.value },
  )

  return [tokensBalances, refetchBalances]
}
