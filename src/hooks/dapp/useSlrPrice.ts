import { createSharedComposable, useIntervalFn } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { ref, Ref } from 'vue'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { fetchPrice } from '@/utils/tokens/fetchPrice'
import { BIG_ZERO } from '@/utils/bigNumber'

export const useSlrPrice = createSharedComposable(() => {
  const slrPrice = ref(BIG_ZERO) as Ref<BigNumber>
  const slrLiquidityPrice = ref(BIG_ZERO) as Ref<BigNumber>

  const refetchSlrPrice = async () => {
    const prices = await fetchPrice(contractsAddresses.SolarToken, [
      contractsAddresses.SolarPair,
      '0xAE4C99935B1AA0e76900e86cD155BFA63aB77A2a',
      '0xF8E4ce287E0D1f9c9fda5EC917515cB87D9C1E6C',
      '0x5126C1B8b4368c6F07292932451230Ba53a6eB7A',
    ])

    slrPrice.value = prices.price
    slrLiquidityPrice.value = prices.liquidityPrice
  }

  useIntervalFn(refetchSlrPrice, 20000, { immediate: true })

  return { slrPrice, slrLiquidityPrice }
})
