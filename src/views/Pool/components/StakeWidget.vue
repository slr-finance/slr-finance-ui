<template>
  <section class="staking-widget">
    <div class="flex-1 flex flex-col justify-center">
      <div class="text-12 text-white/60 mb-8 h-24 flex items-center cursor-default">
        <div class="w-20 h-20 border border-white rounded-full mr-8" />
        {{ poolInfo.page.description }}
      </div>

      <h2 class="title text-40 uppercase font-title text-page-active mb-8 leading-140 cursor-default">
        {{ poolInfo.name }}&nbsp;<span class="opacity-60">staking planet</span>
      </h2>

      <p class="text-16 text-white/60 leading-125 mb-20 cursor-default">
        <span class="text-page-active">{{ apyStr }}</span>
      </p>

      <staker-info
        :pool-id="poolState.id"
        class="mb-20"
      />

      <completed-pool
        v-if="isCompletedPool"
        :pool-id="poolState.id"
        class="mb-20"
      />

      <staking-finished
        v-else-if="isCurrentStakerPoolFinished && isCurrentStakerPool && hasCurrentStakerPoolDeposit"
        :pool-id="poolId"
      />

      <stake-form
        v-else-if="isCurrentStakerPool"
        :pool-id="poolId"
      />

      <migrate-form
        v-else-if="canMigrateToNextPool"
        :pool-id="poolId"
      />

      <div v-else>Не активен</div>
    </div>
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { useEthers } from 'vue-dapp'
  import { usePool } from '@/store/hooks/usePool'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { useI18n } from 'vue-i18n'
  import { useStaker } from '@/store/hooks/useStaker'
  import StakerInfo from './StakerInfo.vue'
  import StakingFinished from './StakingFinished.vue'
  import CompletedPool from './CompletedPool.vue'
  import StakeForm from './StakeForm.vue'
  import MigrateForm from './MigrateForm.vue'

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
      const poolInfo = usePoolInfo(poolId)
      const formattedApy = usePercentFormat(poolState.value.apy)
      const apyStr = computed(() => t('pool.fixedApy', [formattedApy.value]))
      const { isActivated } = useEthers()
      const [stakerState] = useStaker()

      const isCompletedPool = computed(() => poolState.value.id < stakerState.value.poolId)
      const isCurrentStakerPool = computed(
        () => poolId.value === stakerState.value.poolId || stakerState.value.poolId === 0,
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
      }
    },
    components: {
      StakeForm,
      MigrateForm,
      StakerInfo,
      StakingFinished,
      CompletedPool,
    },
  })
</script>

<style lang="postcss">
  .staking-widget {
    @apply flex flex-col justify-center;

    max-width: 321px;
  }
</style>
