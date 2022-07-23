import type BigNumber from 'bignumber.js'
import { AddressZero } from "@ethersproject/constants"
import { BigNumber as BigNumberEthers } from 'ethers'
import { ref, ShallowRef, shallowRef } from 'vue'
import { createSharedComposable, watchTriggerable } from '@vueuse/core'
import { useEthers } from '@/hooks/dapp/useEthers'
import { BIG_ZERO, parseWei } from '@/utils/bigNumber'
import { Call, multicall } from '@/utils/contracts/multicall'
import { Staking__factory } from '@/contracts'
import { POOLS_INFO } from '@/config/constants/Pools'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { StopController } from '@/utils/StopController'

export type StakerHistory = {
  poolId: number
  amount: BigNumber
  earned: BigNumber
  lock: number
}

export type StakerState = {
  address: string
  isStakinFinished: boolean
  poolId: number
  amount: BigNumber
  amountRaw: BigNumberEthers
  startStaking: number
  lock: number
  timestamp: number
  rewardRaw: BigNumberEthers
  reward: BigNumber
  history: StakerHistory[]
}

const defaultStakerState = (address = AddressZero): StakerState => ({
  address,
  isStakinFinished: false,
  poolId: 0,
  amount: BIG_ZERO,
  amountRaw: BigNumberEthers.from(0),
  startStaking: 0,
  lock: 0,
  timestamp: 0,
  reward: BIG_ZERO,
  rewardRaw: BigNumberEthers.from(0),
  history: [],
})

export const useStakerState = createSharedComposable(() => {
  const stakerState:ShallowRef<StakerState> = shallowRef(defaultStakerState())
  const isFetching = ref(false)
  const { address } = useEthers()

  const resetState = () => {
    stakerState.value = defaultStakerState()
    isFetching.value = false
  }

  const { trigger: refetchStaker } = watchTriggerable(
    address,
    async (userAddress:string, _, onCleanup) => {
      try {
        resetState()
        const stopController = new StopController(onCleanup)

        if (!userAddress) {
          stopController.stop()
        }

        stopController.breakIfStoping()

        const calls: Call[] = [
          {
            address: contractsAddresses.StakingService,
            name: 'getStaker',
            params: [userAddress],
          },
        ]
      
        POOLS_INFO.map((poolInfo) => {
          calls.push({
            address: contractsAddresses.StakingService,
            name: 'getStakerHistory',
            params: [userAddress, poolInfo.id],
          })
        })
      
        const [[stakerRaw, ...stakerHistoryRaw]] = await multicall(Staking__factory.abi, calls)
      
        const history = stakerHistoryRaw.map((stakerHistoryItem) => ({
          poolId: stakerHistoryItem.poolId,
          amount: parseWei(stakerHistoryItem.amount, 18),
          earned: parseWei(stakerHistoryItem.earned, 18),
          lock: stakerHistoryItem.lock,
        }))
        stakerState.value = {
          isStakinFinished: stakerRaw.startStaking + stakerRaw.lock < stakerRaw.timestamp,
          address: userAddress,
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
      
        isFetching.value = false
      } catch (error) {
        resetState()

        if (!StopController.isStoped(error)) {
          throw error
        }
      }
    },
    { immediate: true }
  )

  return { stakerState, isFetching, refetchStaker }
})
