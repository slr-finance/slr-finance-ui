<template>
  <ui-button
    :disabled="isDisabled"
    :type="type"
    :size="size"
    :variant="variant"
  >
    <div v-if="txState.isWaitingForSigning && !loading">Waiting confirmation in your wallet</div>
    <div v-else-if="txState.isWaitingForReceipt || loading">Loader</div>
    <div v-else><slot /></div>
  </ui-button>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import { TxState, TxStatus } from '@/hooks/useSendTx'

  export default defineComponent({
    name: 'send-tx-button',
    props: {
      type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      txState: {
        type: Object as PropType<TxState<TxStatus>>,
        required: true,
      },
      size: {
        type: [Number, String],
      },
      variant: {
        validator: (value: string) => ['green-atomic', 'white', 'default', 'violet', 'gray-800'].includes(value),
        default: 'green-atomic',
      },
    },
    setup(props) {
      const isDisabled = computed(
        () => props.disabled || props.loading || props.txState.isWaitingForSigning || props.txState.isWaitingForReceipt,
      )

      return {
        isDisabled,
      }
    },
    components: {
      UiButton,
    },
  })
</script>
