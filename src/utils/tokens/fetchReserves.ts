import { Call, multicall } from '@/utils/contracts/multicall'
import PairAbi from '@/config/abi/Pair.json'
import { BigNumber as BigNumberEthers } from 'ethers'

export const fetchReserves = async (
  pairs: string[],
): Promise<
  {
    pair: string
    token0: string
    token1: string
    reserves: [BigNumberEthers, BigNumberEthers]
  }[]
> => {
  const calls: Call[] = pairs
    .map((pairAddress) => [
      { address: pairAddress, name: 'token0' },
      { address: pairAddress, name: 'token1' },
      { address: pairAddress, name: 'getReserves' },
    ])
    .flat()

  const [response] = await multicall(PairAbi, calls)

  return pairs.map((pair, index) => ({
    pair: pair,
    token0: response[index * 3][0] as string,
    token1: response[index * 3 + 1][0] as string,
    reserves: [response[index * 3 + 2].reserve0, response[index * 3 + 2].reserve1],
  }))
}
