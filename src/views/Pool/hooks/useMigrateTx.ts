import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { useSlrBalance } from '@/store/hooks/useBalance'
import { useStakingContract } from '@/hooks/contracts/useStakingContract'
import { bigToWei } from '@/utils/bigNumber'

type UseStakeParams = {
  poolId: MaybeRef<number>
  amount: MaybeRef<BigNumber>
  days: MaybeRef<number>
}

export const useMigrateTx = (params: UseStakeParams) => {
  const [slrTokenInfo] = useSlrBalance()
  const amountWei = computed(() => bigToWei(unref(params.amount), slrTokenInfo.value.decimals))
  const stakingContract = useStakingContract()
  const callParams = computed(() => [
    unref(params.poolId),
    unref(amountWei),
    Number(unref(params.days)),
  ])

  return useSendTx(stakingContract, 'migrate', callParams)
}
