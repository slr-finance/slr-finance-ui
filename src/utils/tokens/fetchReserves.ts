import { Call, multicall } from '@/utils/contracts/multicall'
import PairAbi from '@/config/abi/Pair.json'
import { ethersToBigNumber } from '@/utils/bigNumber'
import BigNumber from 'bignumber.js'

export const fetchReserves = async (
  pairs: string[],
): Promise<
  {
    pair: string
    token0: string
    token1: string
    reserves: [BigNumber, BigNumber]
  }[]
> => {
  const calls: Call[] = pairs
    .map((pairAddress) => [
      { address: pairAddress, name: 'token0' },
      { address: pairAddress, name: 'token1' },
      { address: pairAddress, name: 'getReserves' },
    ])
    .flat()

  const response = await multicall(PairAbi, calls)

  return pairs.map((pair, index) => ({
    pair: pair,
    token0: response[index * 3][0] as string,
    token1: response[index * 3 + 1][0] as string,
    reserves: [
      ethersToBigNumber(response[index * 3 + 2].reserve0),
      ethersToBigNumber(response[index * 3 + 2].reserve1),
    ],
  }))
}
