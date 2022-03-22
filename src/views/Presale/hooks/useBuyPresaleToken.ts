import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from 'vue-dapp'
import { getReferrerFromLocalstorage } from '@/utils/getReferrerFromLocalstorage'
import { getPresaleContract } from '@/utils/contracts/getPresaleContract'
import BigNumber from 'bignumber.js'
import { MaybeRef } from '@vueuse/core'
import { BIG_TEN } from '@/utils/bigNumber'

export const useBuyPresaleToken = (
  amountIn: MaybeRef<BigNumber>,
  amountOut: MaybeRef<BigNumber>,
  tokenInDecimals: MaybeRef<number>,
  tokenOutDecimals: MaybeRef<number>,
) => {
  const { signer } = useEthers()
  const referrer = getReferrerFromLocalstorage()
  const presaleContract = computed(() => getPresaleContract(unref(signer)))
  const params = computed(() => [
    unref(amountIn)
      .times(BIG_TEN.pow(unref(tokenInDecimals)))
      .toFixed(),
    unref(amountOut)
      .times(BIG_TEN.pow(unref(tokenOutDecimals)))
      .toFixed(),
    referrer,
  ])

  return useSendTx(presaleContract, 'buy', params)
}
