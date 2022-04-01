<template>
  <div
    ref="container"
    class="pool-page"
  >
    <pool-planet :pool-id="poolId" />

    <section class="staking-widget">
      <div class="flex-1 flex flex-col justify-between space-y-32">
        <div class="flex-1 flex flex-col">
          <div class="text-12 text-white/60 mb-8 h-24 flex items-center cursor-default">
            <div class="w-20 h-20 border border-white rounded-full mr-8" />
            {{ poolInfo.page.description }}
          </div>

          <h2 class="title text-40 uppercase font-title text-page-active mb-8 leading-140 cursor-default">
            {{ poolInfo.name }} <span class="opacity-60">staking planet</span>
          </h2>

          <p class="text-16 text-white/40 leading-125 mb-20 cursor-default">
            Fixed APY:
            <span class="text-yellow text-opacity-80">{{ apyStr }}</span>
          </p>

          <div
            v-if="!isStakerLoaded"
            class="flex flex-1 justify-center items-center py-48"
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

          <div
            v-else
            class="flex-1 flex justify-center items-center"
          >
            <disable-pool-state
              :pool-id="poolId"
              class="w-full"
            />
          </div>
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
  </div>
</template>

<script lang="ts">
  import { FetchingStatus } from '@/entities/common'
  import { computed, defineComponent, toRef } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { usePool } from '@/store/hooks/usePool'
  import { useStaker } from '@/store/hooks/useStaker'
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
  import StakingWidget from './components/StakeWidget.vue'
  import PoolPlanet from './components/PoolPlanet.vue'

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
      PoolPlanet,
    },
  })
</script>

<style lang="postcss">
  .pool-page {
    @apply grid bg-black;

    min-height: 100% !important; /* browser fill */
    height: auto;

    padding-top: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding));
    grid-template: 'pool nav';
    grid-template-columns: minmax(min-content, 1200px) 1fr;
    grid-template-rows: 1fr;
    gap: 8px;
    background-size: contain;
  }

  .pool-page > .staking-widget {
    @apply h-full pt-80 relative z-40 flex flex-col justify-center;

    max-width: 321px;
    grid-area: pool;
  }

  .pool-page > .staking-nav {
    @apply h-full relative z-40;

    grid-area: nav;
  }
</style>
