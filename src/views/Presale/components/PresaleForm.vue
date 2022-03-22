<template>
  <div>
    Presale form
    <form class="flex flex-col items-stretch">
      <ui-input v-model:value="amountInStr" />
      <ui-input-bn v-model:value="amountOut" />

      <approve-token-plug
        :minAllowance="amountIn"
        :tokenAddress="tokenOutAddress"
        :spenderAddress="presaleAddress"
      >
        <send-tx-button
          @click="handelBuy"
          :txState="buyTxState"
        >
          Buy
        </send-tx-button>
      </approve-token-plug>
    </form>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, Ref, ref, toRef } from 'vue'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import UiInput from '@/components/ui/UiInput.vue'
  import UiInputBn from '@/components/ui/UiInputBn.vue'

  import { syncRef } from '@vueuse/core'
  import BigNumber from 'bignumber.js'
  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'

  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import { useBuyPresaleToken } from '../hooks/useBuyPresaleToken'

  export default defineComponent({
    props: {
      price: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
      tokenOutAddress: {
        type: String,
        required: true,
      },
      tokenInDecimals: {
        type: Number,
        required: true,
      },
      tokenOutDecimals: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const amountInStr = ref('0')
      const amountIn = computed(() => new BigNumber(amountInStr.value.replaceAll(/[^0-9]/g, '')))
      const amountOut = ref(new BigNumber(0)) as Ref<BigNumber>
      const calcAmountIn = computed(() => amountOut.value.times(props.price))
      const calcAmountInStr = computed(() => amountIn.value.toNumber().toLocaleString())
      const calcAmountOut = computed(() => amountIn.value.div(props.price))

      syncRef(calcAmountIn, amountIn)
      syncRef(calcAmountOut, amountOut)
      syncRef(calcAmountInStr, amountInStr)

      const tokenInDecimals = toRef(props, 'tokenInDecimals')
      const tokenOutDecimals = toRef(props, 'tokenOutDecimals')
      const [handelBuy, buyTxState] = useBuyPresaleToken(amountIn, amountOut, tokenInDecimals, tokenOutDecimals)

      return {
        handelBuy,
        amountInStr,
        amountIn,
        amountOut,
        presaleAddress: contractsAddresses.PresaleService,
        buyTxState,
      }
    },
    components: {
      SendTxButton,
      UiInput,
      UiInputBn,
      ApproveTokenPlug,
    },
  })
</script>
