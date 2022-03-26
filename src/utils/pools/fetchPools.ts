import { Call, multicall } from '@/utils/contracts/multicall'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import StakingAbi from '@/config/abi/Staking.json'
import { getApy } from '@/utils/math/getApy'
import { ethersToBigNumber, parseWei } from '@/utils/bigNumber'
import { FetchingStatus } from '@/entities/common'

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
    const apr = ethersToBigNumber(poolState.apr).div(100000000)
    const withdrawalFee = ethersToBigNumber(poolState.withdrawalFees).div(1000)

    return {
      fetchStatus: FetchingStatus.NONE,
      apr: apr,
      apy: getApy(apr),
      maxDays: poolState.maxLock,
      minDays: poolState.minLock,
      id: poolState.id,
      withdrawalFee: withdrawalFee,
      totalStaked: parseWei(poolState.totalStaked, 18),
      isDone: false,
      isActive: true,
    }
  })

  return poolsInfo
}
