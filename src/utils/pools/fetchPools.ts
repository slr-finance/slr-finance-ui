import { Call, multicall } from '@/utils/contracts/multicall'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import StakingAbi from '@/config/abi/Staking.json'
import BigNumber from 'bignumber.js'
import { getApy } from '../math/getApy'

export const fetchPools = async (pools: number[]) => {
  const calls: Call[] = pools
    .map((poolId) => [
      {
        address: contractsAddresses.StakingService,
        name: 'state',
        params: [poolId],
      },
    ])
    .flat(1)

  const response = await multicall(StakingAbi, calls)
  const poolsInfo = pools.map((poolId, index) => {
    const poolState = response[index]
    const apr = new BigNumber(poolState.apr._hex).div(100000000)
    const withdrawalFee = new BigNumber(poolState.withdrawalFees._hex).div(1000)

    return {
      apr: apr,
      apy: getApy(apr),
      maxDays: poolState.maxLock,
      minDays: poolState.minLock,
      id: poolState.id,
      withdrawalFee: withdrawalFee,
      totalStaked: new BigNumber(poolState.totalStaked._hex),
      isDone: false,
      isActive: true,
    }
  })

  return poolsInfo
}
