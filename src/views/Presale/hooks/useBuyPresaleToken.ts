import { computed, unref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import { getReferrerFromCookies } from '@slr-finance/ui-share'
import { useSendTx } from '@/hooks/useSendTx'
import { usePresaleContract } from '@/hooks/contracts/usePresaleContract'
import BigNumber from 'bignumber.js'
import { bigToWei } from '@/utils/bigNumber'

export const useBuyPresaleToken = (amountIn: MaybeRef<BigNumber>, amountOut: MaybeRef<BigNumber>) => {
  const presaleContract = usePresaleContract()
  const referrer = getReferrerFromCookies()
  const params = computed(() => [bigToWei(unref(amountOut), 18), referrer])
  const options = computed(() => ({
    value: bigToWei(unref(amountIn), 18),
  }))

  return useSendTx(presaleContract, 'buy', params, options)
}
