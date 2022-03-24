import { FetchingStatus } from '@/entities/common'
import BigNumber from 'bignumber.js'
import { createModule } from 'vuexok'
import { fetchPrice } from '@/utils/tokens/fetchPrice'
import contractsAddresses from '@/config/constants/contractsAddresses.json'

export const slrModule = createModule('slr', {
  state: {
    price: new BigNumber(0),
    fetchStatus: FetchingStatus.NONE,
  },
  actions: {
    async fetchPrice() {
      slrModule.mutations.priceFetching()

      try {
        const slrPrice = await fetchPrice(contractsAddresses.SolarToken, ['0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3', '0xAE4C99935B1AA0e76900e86cD155BFA63aB77A2a', '0xF8E4ce287E0D1f9c9fda5EC917515cB87D9C1E6C', '0x5126C1B8b4368c6F07292932451230Ba53a6eB7A'])

        slrModule.mutations.priceFetched(slrPrice)
      } catch (error) {
        slrModule.mutations.priceError(error as Error)
      }
    },
  },
  mutations: {
    priceFetching(state) {
      state.fetchStatus = FetchingStatus.FETCHING
    },
    priceFetched(state, price: BigNumber) {
      state.price = price
      state.fetchStatus = FetchingStatus.FETCHED
    },
    priceError(state, error: Error) {
      console.error(error)
      state.fetchStatus = FetchingStatus.ERROR
    },
  },
})
