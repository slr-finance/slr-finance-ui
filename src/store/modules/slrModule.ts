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
        const slrPrice = await fetchPrice(contractsAddresses.SolarToken, ['0x430d9FAFf11096C119258Cd0A158276FaAa0798d'])

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
