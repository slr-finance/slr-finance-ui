<template>
  <div
    v-if="state.isInvalidAmount"
    class="h-48 flex justify-center items-center rounded-10 bg-gray bg-opacity-30 text-12 text-white text-opacity-60 cursor-default"
  >
    {{ state.message }}
  </div>
  <slot v-else />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import BigNumber from 'bignumber.js'

  export default defineComponent({
    name: 'insufficient-balance-plug',
    props: {
      allowZero: {
        type: Boolean,
        default: false,
      },
      tokenSymbol: {
        type: String,
        default: '',
      },
      amount: {
        type: Object as PropType<BigNumber>,
        default: new BigNumber(0),
      },
      balance: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
    },
    setup(props) {
      const state = computed(() => {
        const isEmptyAmount = !props.allowZero && props.amount.lte(0)
        const isInsufficientBalance = props.amount.gt(props.balance)

        return {
          isInvalidAmount: isEmptyAmount || isInsufficientBalance,
          message: isEmptyAmount ? 'Enter an amount' : `Insufficient ${props.tokenSymbol} balance`,
        }
      })

      return { state }
    },
  })
</script>
