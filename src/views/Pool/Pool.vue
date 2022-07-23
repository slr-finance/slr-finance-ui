<template>
  <section
    class="staking-widget min-h-full h-auto relative z-ui-page-content page-content flex flex-col justify-center"
  >
    <div class="flex-1 flex flex-col justify-between space-y-32">
      <div class="flex-1 flex flex-col">
        <div class="text-12 text-white/60 mb-8 py-2 flex items-start cursor-default">
          <div class="w-20 h-20 border border-white rounded-full mr-8 flex-grow-0 flex-shrink-0" />
          {{ poolInfo.page.description }}
        </div>

        <h2 class="title text-ui-page-title uppercase font-title mb-8 leading-140 cursor-default">
          {{ poolInfo.name }} <span class="opacity-60">staking {{ poolInfo.page.objectTypeName }}</span>
        </h2>

        <p class="text-ui-page-description text-white/40 leading-125 mb-20 cursor-default">
          Fixed APY:
          <ui-text-placeholder
            :text="apyStr"
            class="text-yellow text-opacity-80 min-w-64"
          />
        </p>

        <ui-galaxy-loader
          v-if="isFetching && isActivated"
          class="flex-1 py-48"
        />

        <div
          v-else-if="isCompletedPool"
          class="flex-1 flex justify-center items-center mb-20"
        >
          <completed-pool
            :pool-id="poolState.id"
            class="w-full"
          />
        </div>

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

        <div
          v-else
          class="flex-1 flex justify-center items-center"
        >
          <disable-pool-state
            :pool-id="poolId"
            v-memo="[poolId]"
            class="w-full"
          />
        </div>
      </div>

      <div>
        <pool-tvl
          :pool-id="poolId"
          class="mb-24"
        />

        <div class="text-14 mb-32">{{ poolInfo.page.aboutPool }}</div>
        <token-info />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { usePoolState } from './hooks/usePoolState'
  import { useStakerState } from './hooks/useStakerState'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import { usePoolInfo } from './hooks/usePoolInfo'
  import StakingFinished from './components/StakingFinished.vue'
  import CompletedPool from './components/CompletedPool.vue'
  import StakeForm from './components/StakeForm.vue'
  import MigrateForm from './components/MigrateForm.vue'
  import TokenInfo from './components/TokenInfo.vue'
  import PoolTvl from './components/PoolTvl.vue'
  import StakerInfo from './components/StakerInfo.vue'
  import StakedState from './components/StakedState'
  import DisablePoolState from './components/DisablePoolState.vue'
  import UiTextPlaceholder from '@/components/ui/UiTextPlaceholder.vue'
  import { percentFormat } from '@/utils/strFormat/percentFormat'

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
      const poolId = toRef(props, 'poolId')
      const [poolState, isPoolFetching] = usePoolState(poolId)
      const apyStr = computed(() => {
        const poolStateVal = poolState.value

        return !isPoolFetching.value ? percentFormat(poolStateVal.apy) : null
      })
      const poolInfo = usePoolInfo(poolId)
      const { isActivated } = useEthers()
      const { stakerState, isFetching } = useStakerState()

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
        isFetching,
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
      UiTextPlaceholder,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .staking-widget {
    max-width: 321px;
  }
</style>
