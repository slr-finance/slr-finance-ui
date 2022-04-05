import { computed, unref } from 'vue'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from '@/hooks/dapp/useEthers'
import { getReferrerFromLocalstorage } from '@/utils/getReferrerFromLocalstorage'
import { getPresaleContract } from '@/utils/contracts/getPresaleContract'
import BigNumber from 'bignumber.js'
import { MaybeRef } from '@vueuse/core'
import { bigToWei } from '@/utils/bigNumber'

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
    bigToWei(unref(amountIn), unref(tokenInDecimals)),
    bigToWei(unref(amountOut), unref(tokenOutDecimals)),
    referrer,
  ])

  return useSendTx(presaleContract, 'buy', params)
}
