import { Call, multicall } from '@/utils/contracts/multicall'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import StakingAbi from '@/config/abi/Staking.json'
import { FetchingStatus } from '@/entities/common'
import { parseWei } from '@/utils/bigNumber'
import { POOLS_INFO } from '@/config/constants/Pools'

export const fetchStaker = async (stakerAddress: string) => {
  const calls: Call[] = [
    {
      address: contractsAddresses.StakingService,
      name: 'getStaker',
      params: [stakerAddress],
    },
  ]

  POOLS_INFO.map(poolInfo => {
    calls.push({
      address: contractsAddresses.StakingService,
      name: 'getStakerHistory',
      params: [stakerAddress, poolInfo.id],
    })
  })

  const [[stakerRaw, ...stakerHistoryRaw]] = await multicall(StakingAbi, calls)

  const history = stakerHistoryRaw.map(stakerHistoryItem => ({
    poolId: stakerHistoryItem.poolId,
    amount: parseWei(stakerHistoryItem.amount, 18),
    earned: parseWei(stakerHistoryItem.earned, 18),
    lock: stakerHistoryItem.lock,
  }))
  console.log(stakerHistoryRaw, history)
  const result = {
    fetchStatus: FetchingStatus.FETCHED,
    isStakinFinished: stakerRaw.startStaking + stakerRaw.lock < stakerRaw.timestamp,
    address: stakerAddress,
    poolId: stakerRaw.poolId,
    startStaking: stakerRaw.startStaking,
    lock: stakerRaw.lock,
    amount: parseWei(stakerRaw.amount, 18),
    amountRaw: stakerRaw.amount,
    timestamp: stakerRaw.timestamp,
    rewardRaw: stakerRaw.reward,
    reward: parseWei(stakerRaw.reward, 18),
    history,
  }

  return result
}
