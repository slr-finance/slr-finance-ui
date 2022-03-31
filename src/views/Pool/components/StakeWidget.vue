<template>
  <section class="staking-widget">
    <div class="flex-1 flex flex-col justify-between space-y-32">
      <div>
        <div class="text-12 text-white/60 mb-8 h-24 flex items-center cursor-default">
          <div class="w-20 h-20 border border-white rounded-full mr-8" />
          {{ poolInfo.page.description }}
        </div>

        <h2 class="title text-40 uppercase font-title text-page-active mb-8 leading-140 cursor-default">
          {{ poolInfo.name }}&nbsp;<span class="opacity-60">staking planet</span>
        </h2>

        <p class="text-16 text-white/40 leading-125 mb-20 cursor-default">
          Fixed APY:
          <span class="text-yellow text-opacity-80">{{ apyStr }}</span>
        </p>

        <div
          v-if="!isStakerLoaded"
          class="flex justify-center items-center py-48"
        >
          <ui-galaxy-loader />
        </div>

        <completed-pool
          v-else-if="isCompletedPool"
          :pool-id="poolState.id"
          class="mb-20"
        />

        <staking-finished
          v-else-if="isCurrentStakerPoolFinished && isCurrentStakerPool && hasCurrentStakerPoolDeposit"
          :pool-id="poolId"
        />

        <stake-form
          v-else-if="isCurrentStakerPool && !hasCurrentStakerPoolDeposit"
          :pool-id="poolId"
        />

        <staked-state
          v-else-if="isCurrentStakerPool && hasCurrentStakerPoolDeposit"
          :pool-id="poolId"
        />

        <migrate-form
          v-else-if="canMigrateToNextPool"
          :pool-id="poolId"
        />

        <disable-pool-state
          v-else
          :pool-id="poolId"
        />
      </div>

      <div>
        <pool-tvl
          :pool-id="poolId"
          class="mb-24"
        />
        <div class="text-14 mb-32">
          The first planet of the solar farming system, the first step of your earnings, start your flight from it to
          the golden sun and high APY
        </div>
        <token-info />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { usePool } from '@/store/hooks/usePool'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { useI18n } from 'vue-i18n'
  import { useStaker } from '@/store/hooks/useStaker'
  import StakingFinished from './StakingFinished.vue'
  import CompletedPool from './CompletedPool.vue'
  import StakeForm from './StakeForm.vue'
  import MigrateForm from './MigrateForm.vue'
  import TokenInfo from './TokenInfo.vue'
  import PoolTvl from './PoolTvl.vue'
  import StakerInfo from './StakerInfo.vue'
  import StakedState from './StakedState'
  import DisablePoolState from './DisablePoolState.vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import { FetchingStatus } from '@/entities/common'

  export default defineComponent({
    name: 'staking-widget',
    inheritAttrs: true,
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const { t } = useI18n()
      const poolId = toRef(props, 'poolId')
      const poolState = usePool(poolId)
      const apy = computed(() => poolState.value.apy)
      const poolInfo = usePoolInfo(poolId)
      const apyStr = usePercentFormat(apy)
      const { isActivated } = useEthers()
      const [stakerState] = useStaker()
      const isStakerLoaded = computed(
        () => stakerState.value.fetchStatus === FetchingStatus.FETCHED || !isActivated.value,
      )

      const isCompletedPool = computed(() => poolState.value.id < stakerState.value.poolId)
      const isCurrentStakerPool = computed(
        () =>
          poolId.value === stakerState.value.poolId ||
          (stakerState.value.poolId === 0 && poolId.value === 1) ||
          !isActivated.value,
      )
      const hasCurrentStakerPoolDeposit = computed(() => stakerState.value.amount.gt(0))
      const isCurrentStakerPoolFinished = computed(() => {
        const { startStaking, lock, timestamp } = stakerState.value

        return startStaking + lock < timestamp
      })
      const canMigrateToNextPool = computed(
        () =>
          poolId.value > 1 &&
          stakerState.value.poolId === poolId.value - 1 &&
          hasCurrentStakerPoolDeposit.value &&
          isCurrentStakerPoolFinished.value,
      )

      return {
        isCurrentStakerPool,
        hasCurrentStakerPoolDeposit,
        canMigrateToNextPool,
        isCompletedPool,

        poolInfo,
        apyStr,
        isActivated,
        poolState,
        stakerState,
        isCurrentStakerPoolFinished,
        isStakerLoaded,
      }
    },
    components: {
      StakeForm,
      MigrateForm,
      StakingFinished,
      CompletedPool,
      TokenInfo,
      PoolTvl,
      StakerInfo,
      StakedState,
      DisablePoolState,
      UiGalaxyLoader,
    },
  })
</script>

<style lang="postcss">
  .staking-widget {
    @apply flex flex-col justify-center;

    max-width: 321px;
  }
</style>
