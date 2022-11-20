<template>
  <div class="flex-1 flex flex-col">
    <ui-galaxy-loader
      v-if="isFetching && isActivated"
      class="flex-1 py-48"
    />

    <completed-pool
      v-else-if="isCompletedPool"
      :pool-id="poolState.id"
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
      v-memo="[poolId]"
      class="w-full"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { usePoolState } from './hooks/usePoolState'
  import { useStakerState } from './hooks/useStakerState'
  import { UiGalaxyLoader } from '@slr-finance/uikit'
  import StakingFinished from './components/StakingFinished.vue'
  import CompletedPool from './components/CompletedPool.vue'
  import StakeForm from './components/StakeForm.vue'
  import MigrateForm from './components/MigrateForm.vue'
  import StakerInfo from './components/StakerInfo.vue'
  import StakedState from './components/StakedState'
  import DisablePoolState from './components/DisablePoolState.vue'

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
      const [poolState] = usePoolState(poolId)

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
      StakerInfo,
      StakedState,
      DisablePoolState,
      UiGalaxyLoader,
    },
  })
</script>
