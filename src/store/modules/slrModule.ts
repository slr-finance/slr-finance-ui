import { FetchingStatus } from '@/entities/common'
import BigNumber from 'bignumber.js'
import { createModule } from 'vuexok'
import { fetchPrice } from '@/utils/tokens/fetchPrice'
import contractsAddresses from '@/config/constants/contractsAddresses.json'

export const slrModule = createModule('slr', {
  state: {
    price: new BigNumber(0),
    liquidityPrice: new BigNumber(0),
    fetchStatus: FetchingStatus.NONE,
  },
  actions: {
    async fetchPrice() {
      slrModule.mutations.priceFetching()

      try {
        const { price, liquidityPrice } = await fetchPrice(contractsAddresses.SolarToken, [
          contractsAddresses.SolarPair,
          '0xAE4C99935B1AA0e76900e86cD155BFA63aB77A2a',
          '0xF8E4ce287E0D1f9c9fda5EC917515cB87D9C1E6C',
          '0x5126C1B8b4368c6F07292932451230Ba53a6eB7A',
        ])

        slrModule.mutations.priceFetched({ price, liquidityPrice })
      } catch (error) {
        slrModule.mutations.priceError(error as Error)
      }
    },
  },
  mutations: {
    priceFetching(state) {
      state.fetchStatus = FetchingStatus.FETCHING
    },
    priceFetched(state, payload: { price: BigNumber; liquidityPrice: BigNumber }) {
      state.price = payload.price
      state.liquidityPrice = payload.liquidityPrice
      state.fetchStatus = FetchingStatus.FETCHED
    },
    priceError(state, error: Error) {
      console.error(error)
      state.fetchStatus = FetchingStatus.ERROR
    },
  },
})
