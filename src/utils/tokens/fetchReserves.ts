import type { BigNumber as BigNumberEthers } from 'ethers'
import { IRouter02__factory } from '@slr-finance/contracts'
import { Call, multicall } from '@/utils/contracts/multicall'

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

  const [response] = await multicall(IRouter02__factory.abi, calls)

  return pairs.map((pair, index) => ({
    pair: pair,
    token0: response[index * 3][0] as string,
    token1: response[index * 3 + 1][0] as string,
    reserves: [response[index * 3 + 2].reserve0, response[index * 3 + 2].reserve1],
  }))
}
