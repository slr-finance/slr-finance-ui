import BigNumber from 'bignumber.js'
import { weiToBig } from '@/utils/bigNumber'
import { fetchReserves } from './fetchReserves'

export const fetchPrice = async (tokenAddress: string, path: string[]) => {
  const pairsInfo = await fetchReserves(path)

  const { price } = pairsInfo.reduce(
    (previousValue, { token0, token1, reserves }) => {
      const [reserve0, reserve1] = reserves
      console.log(previousValue, token0, token1)

      if (previousValue.token !== token0 && previousValue.token !== token1) {
        throw new Error('[fetchPrice]: path is incorrect')
      }

      previousValue.price = previousValue.price.times(
        token0 === previousValue.token ? reserve1.div(reserve0) : reserve0.div(reserve1),
      )
      previousValue.token = token0 === previousValue.token ? token1 : token0

      return previousValue
    },
    { price: new BigNumber(1), token: tokenAddress },
  )

  const liquidityPrice = price
    .times(weiToBig(tokenAddress === pairsInfo[0].token0 ? pairsInfo[0].reserves[0] : pairsInfo[0].reserves[1], 18))
    .times(2)

  return { price, liquidityPrice }
}
