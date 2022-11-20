import { useSlrPrice } from '@/hooks/dapp/useSlrPrice'
import BigNumber from 'bignumber.js'
import { computed, Ref, unref } from 'vue'

export const useUsdPrice = (bignumber: Ref<BigNumber>) => {
  const { slrPrice } = useSlrPrice()

  return computed(() => {
    return unref(bignumber).times(slrPrice.value)
  })
}
