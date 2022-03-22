import { Call, multicall } from '@/utils/contracts/multicall'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import StakingAbi from '@/config/abi/Staking.json'
import { FetchingStatus } from '@/entities/common'
import { BIG_TEN, ethersToBigNumber } from '@/utils/bigNumber'

export const fetchStaker = async (stakerAddress: string) => {
  const calls: Call[] = [
    {
      address: contractsAddresses.StakingService,
      name: 'getStaker',
      params: [stakerAddress],
    },
  ]
  const [stakerRaw] = await multicall(StakingAbi, calls)
  const result = {
    fetchStatus: FetchingStatus.FETCHED,
    isStakinFinished: stakerRaw.startStaking + stakerRaw.lock < stakerRaw.timestamp,
    address: stakerAddress,
    poolId: stakerRaw.poolId,
    startStaking: stakerRaw.startStaking,
    lock: stakerRaw.lock,
    amount: ethersToBigNumber(stakerRaw.amount).div(BIG_TEN.pow(18)),
    amountRaw: stakerRaw.amount,
    timestamp: stakerRaw.timestamp,
    rewardRaw: stakerRaw.reward,
    reward: ethersToBigNumber(stakerRaw.reward).div(BIG_TEN.pow(18)),
  }

  return result
}
