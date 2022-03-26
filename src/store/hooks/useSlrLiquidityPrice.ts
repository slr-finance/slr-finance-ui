import BigNumber from 'bignumber.js'
import { computed, ComputedRef } from 'vue'
import { slrModule } from '../modules/slrModule'
import { store } from '../store'

type UseSlrLiquidityPriceReturns = ComputedRef<BigNumber>

export const useSlrLiquidityPrice = (): UseSlrLiquidityPriceReturns => {
  slrModule.register(store)

  const liquidityPrice = computed(() => slrModule.state.liquidityPrice)

  return liquidityPrice
}
