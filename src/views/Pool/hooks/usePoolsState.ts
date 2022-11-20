import { readonly, Ref, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { StakingService__factory } from '@slr-finance/contracts'
import type BigNumber from 'bignumber.js'
import { BIG_ZERO, ethersToBigNumber, parseWei } from '@/utils/bigNumber'
import { getApy } from '@/utils/math/getApy'
import { Call, multicall } from '@/utils/contracts/multicall'
import { POOLS_INFO } from '@/config/constants/Pools'
import contractsAddresses from '@/config/constants/contractsAddresses'

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
}

const getDefaultPoolState = (poolId: number): PoolState => ({
  apy: BIG_ZERO,
  apr: BIG_ZERO,
  minDays: 0,
  maxDays: 0,
  isDone: false,
  isActive: true,
  withdrawalFee: BIG_ZERO,
  totalStaked: BIG_ZERO,
  id: poolId,
})

type PoolsStates = Record<number, PoolState>

const getDefaultPoolsStates = () =>
  POOLS_INFO.reduce((acc, { id }) => {
    acc[id] = getDefaultPoolState(id)

    return acc
  }, {} as PoolsStates)

export const usePoolsState = createSharedComposable(() => {
  const isFetching = ref(false)
  const pools = ref(getDefaultPoolsStates())

  const refetchPools = async () => {
    isFetching.value = true

    const calls: Call[] = POOLS_INFO.map(({ id }) => [
      {
        address: contractsAddresses.StakingService,
        name: 'state',
        params: [id],
      },
    ]).flat(1)

    const [response] = await multicall(StakingService__factory.abi, calls)

    pools.value = POOLS_INFO.reduce((poolsAcc, _, index) => {
      const poolState = response[index]
      const apr = ethersToBigNumber(poolState.apr).div(1000000)
      const withdrawalFee = ethersToBigNumber(poolState.withdrawalFees).div(1000000)

      poolsAcc[poolState.id] = {
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

      return poolsAcc
    }, {} as PoolsStates)

    isFetching.value = false
  }

  refetchPools()

  return {
    pools: readonly(pools) as Readonly<Ref<PoolsStates>>,
    isFetching: readonly(isFetching),
    refetchPools,
  }
})
