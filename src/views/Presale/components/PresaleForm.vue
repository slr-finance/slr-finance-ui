<template>
  <ui-widget>
    <form class="flex flex-col items-stretch px-8 pb-4">
      <div class="flex justify-between">
        <span class="text-gray">Buy</span>
        <div class="text-gray">
          Avb. <span class="text-violet">{{ bnbBalanceStr }}</span>
        </div>
      </div>
      <ui-input-bn v-model:value="amountIn" class="mt-6">
        <template #postfix>
          <div class="text-12 flex justify-center items-center space-x-8">
            <button
              class="bg-green-atomic bg-opacity-10 text-green-atomic text-opacity-50 text-12 leading-none rounded-4 px-4 py-6 uppercase hover:bg-opacity-20 hover:text-opacity-100 active:bg-opacity-30 transition-colors duration-200"
              type="button"
              @click="handleSetMaxAmount"
            >
              Max
            </button>
            <div>BNB</div>
          </div>
        </template>
      </ui-input-bn>

      <div class="flex justify-between text-14 mt-32">
        <span class="text-gray">Presale price</span>
        <span class="text-white">{{ tokenPrice }} per 1 BNB</span>
      </div>

      <div class="flex justify-between text-14 mt-12 mb-20">
        <div class="flex items-center">
          <ui-icon
            size="18"
            name="slr-logo"
          />
          <span class="text-gray ml-6">Your recieve </span>
        </div>
        <span class="text-white">100.20 SLR</span>
      </div>

      <approve-token-plug
        :minAllowance="amountIn"
        :tokenAddress="tokenOutAddress"
        :spenderAddress="presaleAddress"
      >
        <send-tx-button
          @click="handleBuy"
          :txState="buyTxState"
          size="40"
          variant="violet"
        >
          Buy
        </send-tx-button>
      </approve-token-plug>
    </form>
  </ui-widget>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, Ref, ref, toRef } from 'vue'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import UiInputBn from '@/components/ui/UiInputBn.vue'

  import { syncRef } from '@vueuse/core'
  import BigNumber from 'bignumber.js'
  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'

  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import { useBuyPresaleToken } from '../hooks/useBuyPresaleToken'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useEthers } from '@/hooks/dapp/useEthers'

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
      const { balance: bnbBalance } = useEthers()

      syncRef(calcAmountIn, amountIn)
      syncRef(calcAmountOut, amountOut)
      syncRef(calcAmountInStr, amountInStr)

      const tokenInDecimals = toRef(props, 'tokenInDecimals')
      const tokenOutDecimals = toRef(props, 'tokenOutDecimals')
      const [handleBuy, buyTxState] = useBuyPresaleToken(amountIn, amountOut, tokenInDecimals, tokenOutDecimals)

      const tokenPrice = useTokenAmountFormat(props.price)
      const bnbBalanceStr = useTokenAmountFormat(bnbBalance, 'BNB')

      const handleSetMaxAmount = () => {
        amountInStr.value = useTokenAmountFormat(bnbBalance).value;
      };

      return {
        handleBuy,
        handleSetMaxAmount,
        amountIn,
        amountOut,
        presaleAddress: contractsAddresses.PresaleService,
        buyTxState,
        tokenPrice,
        bnbBalanceStr,
      }
    },
    components: {
      SendTxButton,
      UiInputBn,
      ApproveTokenPlug,
      UiWidget,
      UiIcon,
    },
  })
</script>
