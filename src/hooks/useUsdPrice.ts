import { useSlrPrice } from '@/store/hooks/useSlrPrice'
import BigNumber from 'bignumber.js'
import { computed, Ref, unref } from 'vue'

export const useUsdPrice = (bignumber: Ref<BigNumber>) => {
  const price = useSlrPrice()

  return computed(() => {
    return unref(bignumber).times(unref(price))
  })
}
