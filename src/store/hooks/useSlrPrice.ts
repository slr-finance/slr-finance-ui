import BigNumber from 'bignumber.js'
import { computed, ComputedRef } from 'vue'
import { slrModule } from '../modules/slrModule'
import { store } from '../store'

type UseSlrPriceReturns = ComputedRef<BigNumber>

export const useSlrPrice = (): UseSlrPriceReturns => {
  slrModule.register(store)

  const price = computed(() => slrModule.state.price)

  return price
}
