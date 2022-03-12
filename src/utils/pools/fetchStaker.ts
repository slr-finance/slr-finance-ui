import { Call, multicall } from '@/utils/contracts/multicall'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import StakingAbi from '@/config/abi/Staking.json'
import BigNumber from 'bignumber.js'

const TEN_BN = new BigNumber(10)

export const fetchStaker = async (stakerAddress: string) => {
  const calls: Call[] = [
    {
      address: contractsAddresses.StakingService,
      name: 'getStaker',
      params: [stakerAddress],
    },
  ]

  const [stakerRaw] = await multicall(StakingAbi, calls)

  console.log(stakerRaw)

  const result = {
    isStakinFinished: stakerRaw.startStaking + stakerRaw.lock < stakerRaw.timestamp,
    address: stakerAddress,
    poolId: stakerRaw.poolId,
    startStaking: stakerRaw.startStaking,
    lock: stakerRaw.lock,
    amount: new BigNumber(stakerRaw.amount._hex).div(TEN_BN.pow(18)),
    amountRaw: stakerRaw.amount,
    timestamp: stakerRaw.timestamp,
    rewardRaw: stakerRaw.reward,
    reward: new BigNumber(stakerRaw.reward._hex).div(TEN_BN.pow(18)),
  }

  return result
}
