<template>
  <ui-modal
    v-model="isOpenModal"
    label="Withdrawal"
  >
    <div class="bg-red bg-opacity-10 px-20 py-12 rounded-10 mb-20">
      <ui-placeholder
        title="Please, attend!"
        description="Early withdrawal from staking is subject to commission, wait until the end of the pool and receive funds without commission"
        variant="red"
      >
        <template #icon>
          <ui-icon-alert-circle class="text-red w-18 h-18"/>
        </template>
      </ui-placeholder>
    </div>

    <div class="item mb-20">
      <div class="label">Staked and earned</div>
      <div>{{ stakedAndEarnedStr }}</div>
    </div>

    <div class="item mb-20">
      <div class="label">Withdrawal fee</div>
      <div class="text-red">
        {{ withdrawalFeeStr }}
        <span class="text-red text-opacity-50">({{ withdrawalFeeAmountStr }})</span>
      </div>
    </div>

    <div class="item mb-20">
      <div class="label">You’ll receive</div>
      <div>{{ willBeReceivedStr }}</div>
    </div>

    <send-tx-button
      @click="handleUnstakeWithFee"
      :txState="unstakeWithFeeTxState"
      :size="48"
      variant="red"
      class="w-full"
    >
      Withdrawal to wallet with {{ withdrawalFeeStr }} fee
    </send-tx-button>
  </ui-modal>
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useVModel } from '@vueuse/core'
  import { POOLS_INFO } from '@/config/constants/Pools'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import { UiModal, UiIconAlertCircle } from '@slr-finance/uikit'
  import { usePoolState } from '../../hooks/usePoolState'
  import { useStakerState } from '../../hooks/useStakerState'
  import { useUnstakeWithFee } from '../../hooks/useUnstakeWithFee'
  import { usePoolsState } from '../../hooks/usePoolsState'

  export default defineComponent({
    name: 'withdrawal-with-fee-modal',
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['update:isOpen'],
    setup(props, { emit }) {
      const isOpenModal = useVModel(props, 'isOpen', emit)
      const { stakerState, refetchStaker } = useStakerState()
      const { refetchBalance } = useSlrBalance()
      const { refetchPools } = usePoolsState()
      const poolId = computed(() => stakerState.value.poolId)
      const [poolState] = usePoolState(poolId)
      const stakedAndEarned = computed(() => {
        const { amount, reward } = stakerState.value

        return amount.plus(reward)
      })
      const withdrawalFee = computed(() => poolState.value.withdrawalFee)
      const withdrawalFeeAmount = computed(() => withdrawalFee.value.times(stakedAndEarned.value))
      const willBeReceived = computed(() => stakedAndEarned.value.minus(withdrawalFeeAmount.value))

      const stakedAndEarnedStr = useTokenAmountFormat(stakedAndEarned, 'SLR')
      const withdrawalFeeStr = usePercentFormat(withdrawalFee)
      const withdrawalFeeAmountStr = useTokenAmountFormat(withdrawalFeeAmount, 'SLR')
      const willBeReceivedStr = useTokenAmountFormat(willBeReceived, 'SLR')

      const [handleUnstakeWithFee, unstakeWithFeeTxState] = useUnstakeWithFee(poolId)
      const router = useRouter()
      const handleUnstaked = async () => {
        Promise.all([refetchStaker(), refetchBalance(), refetchPools()])
        isOpenModal.value = false
        router.push({ name: POOLS_INFO[0].routeName })
      }
      watch(unstakeWithFeeTxState, ({ isSuccess }) => isSuccess && handleUnstaked())

      return {
        unstakeWithFeeTxState,
        handleUnstakeWithFee,
        withdrawalFeeStr,
        withdrawalFeeAmountStr,
        willBeReceivedStr,
        stakedAndEarnedStr,
        isOpenModal,
      }
    },
    components: {
      SendTxButton,
      UiPlaceholder,
      UiIconAlertCircle,
      UiModal,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .item {
    @apply flex justify-between items-center text-14 text-white;
  }

  .item > .label {
    @apply text-gray-500;
  }
</style>
