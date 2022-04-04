import BigNumber from 'bignumber.js'
import { Call, multicall } from '../contracts/multicall'
import PairAbi from '@/config/abi/Pair.json'
import { ethersToBigNumber, parseWei } from '@/utils/bigNumber'

export const fetchPrice = async (tokenAddress: string, path: string[]) => {
  const calls: Call[] = path
    .map((pairAddress) => [
      { address: pairAddress, name: 'token0' },
      { address: pairAddress, name: 'token1' },
      { address: pairAddress, name: 'getReserves' },
    ])
    .flat()

  const response = await multicall(PairAbi, calls)
  const { price } = path.reduce(
    (previousValue, pair, index) => {
      const [token0] = response[3 * index]
      const [token1] = response[3 * index + 1]
      const reserves = response[3 * index + 2]
      const reserve0 = ethersToBigNumber(reserves.reserve0)
      const reserve1 = ethersToBigNumber(reserves.reserve1)

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
    .times(parseWei(tokenAddress === response[0] ? response[2].reserve0 : response[2].reserve1, 18))
    .times(2)

  return { price, liquidityPrice }
}
