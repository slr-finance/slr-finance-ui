import { computed, unref } from 'vue'
import { getReferrerFromCookies } from 'slr-finance-ui-share/src/libs/referral'
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

export const useStake = (params: UseStakeParams) => {
  const [slrTokenInfo] = useSlrBalance()
  const amountWei = computed(() => bigToWei(unref(params.amount), slrTokenInfo.value.decimals))
  const stakingContract = useStakingContract()
  const callParams = computed(() => [
    unref(params.poolId),
    unref(amountWei),
    Number(unref(params.days)),
    getReferrerFromCookies(),
  ])

  return useSendTx(stakingContract, 'stake', callParams)
}
