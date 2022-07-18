import { computed, unref } from 'vue'
import { getReferrerFromCookies } from 'slr-finance-ui-share/src/libs/referral'
import { useSendTx } from '@/hooks/useSendTx'
import { useEthers } from '@/hooks/dapp/useEthers'
import { getPresaleContract } from '@/utils/contracts/getPresaleContract'
import BigNumber from 'bignumber.js'
import { MaybeRef } from '@vueuse/core'
import { bigToWei } from '@/utils/bigNumber'

export const useBuyPresaleToken = (amountIn: MaybeRef<BigNumber>, amountOut: MaybeRef<BigNumber>) => {
  const { signer } = useEthers()
  const referrer = getReferrerFromCookies()
  const presaleContract = computed(() => getPresaleContract(signer.value))
  const params = computed(() => [bigToWei(unref(amountOut), 18), referrer])
  const options = computed(() => ({
    value: bigToWei(unref(amountIn), 18),
  }))

  return useSendTx(presaleContract, 'buy', params, options)
}
