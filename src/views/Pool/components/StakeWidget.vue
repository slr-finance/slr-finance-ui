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

      <staker-info :pool-id="poolState.id"/>

      <div v-if="poolState.id < stakerState.poolId">
        <p>Вы тут закончили фармить</p>
        <p>Нафармленно n SOLAR>FINANCE за k дней</p>
        <router-link :to="{ name: 'earth' }">перейти к активной ферме</router-link>
      </div>

      <migrate-form
        v-else-if="isPoolFinished && stakerState.poolId === poolState.id && stakerState.amount.gt(0)"
        :pool-id="poolId"
      />

      <stake-form
        v-else-if="stakerState.poolId === poolState.id"
        :pool-id="poolId"
      />

      <div v-else>Не активен</div>
      {{ isPoolFinished }}
    </div>
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { useEthers } from 'vue-dapp'
  import StakeForm from './StakeForm.vue'
  import StakedForm from './StakedForm.vue'
  import { usePool } from '@/store/hooks/usePool'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { useI18n } from 'vue-i18n'
  import { useStaker } from '@/store/hooks/useStaker'
import StakerInfo from './StakerInfo.vue'
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
      const isPoolFinished = computed(() => {
        const stakerStateVal = stakerState.value

        return stakerStateVal.startStaking + stakerStateVal.lock < stakerStateVal.timestamp
      })

      return {
        poolInfo,
        apyStr,
        isActivated,
        poolState,
        stakerState,
        isPoolFinished,
      }
    },
    components: {
      StakeForm,
      StakedForm,
      StakerInfo,
      MigrateForm,
    },
  })
</script>

<style lang="postcss">
  .staking-widget {
    @apply flex flex-col justify-center;

    max-width: 321px;
  }
</style>
