import { FetchingStatus } from '@/entities/common'
import BigNumber from 'bignumber.js'
import get from 'lodash.get'
import { createModule } from 'vuexok'
import { fetchPools } from '@/utils/pools/fetchPools'
import { fetchStaker } from '@/utils/pools/fetchStaker'
import { POOLS_INFO } from '@/config/constants/Pools'
import { BigNumber as BigNumberEthers, constants } from 'ethers'

export type PoolState = {
  apy: BigNumber
  apr: BigNumber
  minDays: number
  maxDays: number
  isDone: boolean
  isActive: boolean
  id: number
  withdrawalFee: BigNumber
  totalStaked: BigNumber
  fetchStatus: FetchingStatus
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
  fetchStatus: FetchingStatus
}

const getDefaultPoolState = (poolId: number): PoolState => ({
  apy: new BigNumber(0),
  apr: new BigNumber(0),
  minDays: 0,
  maxDays: 0,
  isDone: false,
  isActive: true,
  withdrawalFee: new BigNumber(0),
  totalStaked: new BigNumber(0),
  id: poolId,
  fetchStatus: FetchingStatus.NONE,
})

const defaultStakerState = (): StakerState => ({
  fetchStatus: FetchingStatus.NONE,
  address: constants.AddressZero,
  isStakinFinished: false,
  poolId: 0,
  amount: new BigNumber(0),
  amountRaw: BigNumberEthers.from(0),
  startStaking: 0,
  lock: 0,
  timestamp: 0,
  reward: new BigNumber(0),
  rewardRaw: BigNumberEthers.from(0),
})

export const stakingModule = createModule('staking', {
  namespaced: true,
  state: {
    pools: POOLS_INFO.reduce((pools, { id }) => {
      pools[id] = getDefaultPoolState(id)

      return pools
    }, {} as Record<number, PoolState>),
    staker: defaultStakerState(),
    stakerAddress: constants.AddressZero,
  },
  actions: {
    async setStakerAddress(_, stakerAddress: string | null) {
      if (stakerAddress) {
        stakingModule.mutations.setStakerAddress(stakerAddress)
        stakingModule.actions.fetchStaker(stakerAddress)
      } else {
        stakingModule.mutations.setStakerAddress(constants.AddressZero)
      }
    },
    async fetchAll() {
      stakingModule.mutations.allPoolsFetching()

      try {
        const poolsStates = await fetchPools(POOLS_INFO.map((pool) => pool.id))

        stakingModule.mutations.allPoolsFetched(poolsStates)
      } catch (error) {
        console.error(error)
        stakingModule.mutations.allPoolsError(error as Error)
      }
    },
    async fetchStaker(_, stakerAddress: string) {
      try {
        const staker = await fetchStaker(stakerAddress)

        stakingModule.mutations.stakerFetched(staker)
      } catch (error) {
        console.error(error)
      }
    },
    async refetchStaker({ state: { stakerAddress } }) {
      if (stakerAddress === constants.AddressZero) {
        return
      }

      await stakingModule.actions.fetchStaker(stakerAddress)
    },
  },
  mutations: {
    allPoolsFetching(state) {
      POOLS_INFO.forEach(({ id }) => {
        state.pools[id].fetchStatus = FetchingStatus.FETCHING
      })
    },
    allPoolsFetched(state, poolsStates: PoolState[]) {
      state.pools = poolsStates.reduce((pools, pool) => {
        pools[pool.id] = {
          ...pool,
          fetchStatus: FetchingStatus.FETCHED,
        }

        return pools
      }, {} as Record<number, PoolState>)
    },
    allPoolsError(state, error: Error) {
      console.error(error)

      POOLS_INFO.forEach(({ id }) => {
        state.pools[id].fetchStatus = FetchingStatus.ERROR
      })
    },
    setStakerAddress(state, stakerAddress: string) {
      state.stakerAddress = stakerAddress
    },
    stakerFetched(state, staker: StakerState) {
      if (state.stakerAddress !== staker.address) {
        return
      }

      state.staker = staker
    },
  },
  getters: {
    getPool(state): (poolId: number) => PoolState {
      return (poolId) => get(state.pools, poolId, getDefaultPoolState(poolId))
    },
  },
})
