<template>
  <div class="relative pt-32">
    <ui-poligon
      class="absolute top-32 right-0 transform-gpu 600:translate-x-1/2 translate-x-ui-page-spacing -translate-y-1/2 z-20"
      variant="green-atomic"
      animated
    >
      Active
    </ui-poligon>
    <ui-box-corners class="p-12">
      <div class="flex justify-between pt-18 mb-24">
        <div>
          <div class="text-12 uppercase text-white text-opacity-60 leading-none mb-8">SLR Staked</div>
          <div class="text-14 uppercase text-white leading-none font-title">
            {{ stakedStr }}
          </div>
        </div>

        <div class="space-x-6">
          <ui-button
            variant="violet"
            :size="40"
            @click="() => handleOpenAddForm()"
          >
            <ui-icon-plus class="text-white w-10 h-10"/>
          </ui-button>

          <ui-button
            variant="gray"
            :size="40"
            @click="() => handleOpenRewardForm()"
          >
            <ui-icon-minus class="text-white w-10 h-10"/>
          </ui-button>
        </div>
      </div>

      <div
        class="bg-green-atomic bg-opacity-10 pl-16 pr-16 375:pr-6 py-6 rounded-12 flex justify-between flex-col 375:flex-row space-x-0 375:space-x-12 space-y-12 375:space-y-0"
      >
        <div class="pt-14">
          <div class="text-green-atomic text-12 leading-none mb-8">Rewards</div>
          <div class="text-12 uppercase text-white leading-none font-title">
            {{ earnedStr }}
          </div>
        </div>

        <div
          class="rounded-12 bg-green-atomic-gradient py-14 px-6"
          style="min-width: 130px"
        >
          <div class="text-green-atomic text-12 leading-none mb-8">Time to unlock</div>
          <div class="text-12 uppercase text-white leading-none font-title">
            {{ leftToWaitStr }}
          </div>
        </div>
      </div>
    </ui-box-corners>
  </div>

  <ui-modal
    v-model="isOpenAddModal"
    label="Stake in Pool"
  >
    <stake-more-modal :pool-id="poolId" />
  </ui-modal>

  <withdrawal-with-fee-modal v-model:is-open="isOpenWithdrawalModal" />
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue'
  import { useInterval, useToggle, useTransition } from '@vueuse/core'
  import { UiButton, UiPoligon, UiModal, UiBoxCorners, UiIconPlus, UiIconMinus } from '@slr-finance/uikit'
  import { useStakerState } from '../../hooks/useStakerState'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import WithdrawalWithFeeModal from './WithdrawalWithFeeModal.vue'
  import StakeMoreModal from './StakeMoreModal.vue'
  import { useTimeToFormat } from '@/hooks/formatters/useTimeToFormat'

  export default defineComponent({
    name: 'staked-form',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup() {
      const { stakerState } = useStakerState()
      const stakedAmount = computed(() => stakerState.value.amount)
      const earnedAmountNumber = computed(() => stakerState.value.reward.toNumber())
      const stakedStr = useTokenAmountFormat(stakedAmount, 'SLR')
      const earnedAnimationAmount = useTransition(earnedAmountNumber, { duration: 500 })
      const earnedStr = useTokenAmountFormat(earnedAnimationAmount, 'SLR')

      const lifeTimestamp = useInterval(1000)
      const leftToWait = computed(() => {
        const { startStaking, lock } = stakerState.value

        return Math.max(0, startStaking + lock - lifeTimestamp.value)
      })
      const leftToWaitStr = useTimeToFormat(0, leftToWait)

      // Sync local timestamp with blockchain timestamp
      watch(
        stakerState,
        ({ timestamp }) => {
          lifeTimestamp.value = timestamp
        },
        { immediate: true },
      )

      const [isOpenAddModal, handleOpenAddForm] = useToggle()
      const [isOpenWithdrawalModal, handleOpenRewardForm] = useToggle()

      return {
        stakedStr,
        earnedStr,
        leftToWaitStr,
        isOpenAddModal,
        isOpenWithdrawalModal,
        handleOpenAddForm,
        handleOpenRewardForm,
      }
    },
    components: {
      UiButton,
      UiPoligon,
      UiModal,
      UiIconPlus,
      UiIconMinus,
      UiBoxCorners,

      WithdrawalWithFeeModal,
      StakeMoreModal,
    },
  })
</script>
