import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { getReferrerFromLocalstorage } from '@/utils/getReferrerFromLocalstorage'
import { useSlrBalance } from '@/store/hooks/useBalance'
import { useStakingContract } from '@/hooks/contracts/useStakingContract'
import { bigToWei } from '@/utils/bigNumber'

type UseStakeParams = {
  poolId: MaybeRef<number>
  amount: MaybeRef<BigNumber>
  days: MaybeRef<number>
  reinvestAmount: MaybeRef<BigNumber>
}

export const useStake = (params: UseStakeParams) => {
  const [slrTokenInfo] = useSlrBalance()
  const amountWei = computed(() => bigToWei(unref(params.amount), slrTokenInfo.value.decimals))
  const reinvestAmountWei = computed(() => bigToWei(unref(params.reinvestAmount), slrTokenInfo.value.decimals))
  const stakingContract = useStakingContract()
  const callParams = computed(() => [
    unref(params.poolId),
    unref(amountWei).toFixed(),
    unref(reinvestAmountWei).toFixed(),
    Number(unref(params.days)),
    getReferrerFromLocalstorage(),
  ])

  return useSendTx(stakingContract, 'stake', callParams)
}
