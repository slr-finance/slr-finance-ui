<template>
  <div class="relative pt-32">
    <ui-poligon
      class="absolute top-32 right-0 transform-gpu translate-x-1/2 -translate-y-1/2 z-20"
      variant="green-atomic"
      animated
    >
      Active
    </ui-poligon>
    <div class="ui-box-corners">
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
            size="40"
            @click="() => handleOpenAddForm()"
          >
            <ui-icon
              name="plus"
              size="10"
              class="text-white"
            />
          </ui-button>

          <ui-button
            variant="gray-800"
            size="40"
            @click="() => handleOpenRewardForm()"
          >
            <ui-icon
              name="minus"
              size="10"
              class="text-white"
            />
          </ui-button>
        </div>
      </div>

      <div class="bg-green-atomic bg-opacity-10 pl-16 pr-6 py-6 rounded-12 flex justify-between space-x-12">
        <div class="pt-14">
          <div class="text-green-atomic text-12 leading-none mb-8">Rewards</div>
          <div class="text-12 uppercase text-white leading-none font-title">
            {{ earnedStr }}
          </div>
        </div>

        <div
          class="rounded-12 bg-gradient-to-t from-transparent to-green-atomic bg-op py-14 px-6"
          style="min-width: 130px"
        >
          <div class="text-green-atomic text-12 leading-none mb-8">Time to unlock</div>
          <div class="text-12 uppercase text-white leading-none font-title">
            {{ leftToWaitStr }}
          </div>
        </div>
      </div>
    </div>
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
  import { defineComponent, computed, ref, watch, WritableComputedRef } from 'vue'
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import { useInterval, useToggle, useTransition } from '@vueuse/core'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import UiModal from '@/components/ui/UiModal.vue'
  import { useStaker } from '@/store/hooks/useStaker'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import WithdrawalWithFeeModal from './WithdrawalWithFeeModal.vue'
  import StakeMoreModal from './StakeMoreModal.vue'

  dayjs.extend(relativeTime)

  export default defineComponent({
    name: 'staked-form',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup() {
      const [stakerState] = useStaker()
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
      const leftToWaitStr = computed(() => dayjs().add(leftToWait.value, 's').toNow(true))
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
      UiIcon,
      UiPoligon,
      UiModal,
      WithdrawalWithFeeModal,
      StakeMoreModal,
    },
  })
</script>
