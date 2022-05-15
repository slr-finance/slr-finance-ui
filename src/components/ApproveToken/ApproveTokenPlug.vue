<template>
  <slot
    name="plug"
    v-if="isNeedApprove"
  >
    <send-tx-button
      @click="handleApprove"
      :txState="approveTxState"
      :loading="isFetchingAllowance"
      class="w-full"
      variant="white"
      size="48"
    >
      {{ text }}
    </send-tx-button>
  </slot>
  <slot v-else />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRef, unref, watch } from 'vue'
  import BigNumber from 'bignumber.js'
  import { useApprove } from '@/hooks/token/useApprove'
  import { useAllowance } from '@/hooks/token/useAllowance'
  import UiButton from '@/components/ui/UiButton.vue'
  import SendTxButton from '../Tx/SendTxButton.vue'

  export default defineComponent({
    name: 'approve-token-plug',
    props: {
      text: {
        type: String,
        default: 'Approve',
      },
      minAllowance: {
        type: Object as PropType<BigNumber>,
        default: new BigNumber(0),
      },
      tokenAddress: {
        type: String,
        required: true,
      },
      spenderAddress: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const tokenAddress = toRef(props, 'tokenAddress')
      const spenderAddress = toRef(props, 'spenderAddress')
      const [handleApprove, approveTxState] = useApprove(tokenAddress, spenderAddress)
      const [refetchAllowance, allowance, isFetchingAllowance] = useAllowance(tokenAddress, spenderAddress)
      const isNeedApprove = computed(
        () => unref(allowance).lt(props.minAllowance) || unref(allowance).eq(0) || unref(isFetchingAllowance),
      )

      watch(approveTxState, ({ isSuccess }) => isSuccess && refetchAllowance())

      return {
        allowance,
        handleApprove,
        approveTxState,
        isNeedApprove,
        isFetchingAllowance,
      }
    },
    components: { UiButton, SendTxButton },
  })
</script>
