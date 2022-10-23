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
  import { UiButton } from '@slr-finance/uikit'
  import { TxState, TxStatus } from '@/hooks/useSendTx'
import { UiButtonValiantProp, UI_BUTTON_VARIANTS } from '../../../../slr-uikit/src/components/UiButton'

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
        type: Number,
      },
      variant: {
        type: String as PropType<UiButtonValiantProp>,
        validator: (value: UiButtonValiantProp) => UI_BUTTON_VARIANTS.includes(value),
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
