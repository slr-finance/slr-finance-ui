import { computed, unref } from 'vue'
// import { getReferrerFromCookies } from '@slr-finance/ui-share'
import { useSendTx } from '@/hooks/useSendTx'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
import { useStakingContract } from '@/hooks/contracts/useStakingContract'
import { bigToWei } from '@/utils/bigNumber'

type UseStakeParams = {
  poolId: MaybeRef<number>
  amount: MaybeRef<BigNumber>
  days: MaybeRef<number>
}

export const useStakeTx = (params: UseStakeParams) => {
  const { decimals } = useSlrBalance()
  const amountWei = computed(() => bigToWei(unref(params.amount), decimals.value))
  const stakingContract = useStakingContract()
  const callParams = computed(() => [
    unref(params.poolId),
    unref(amountWei),
    Number(unref(params.days)),
    // getReferrerFromCookies(),
  ])

  return useSendTx(stakingContract, 'stake', callParams)
}
