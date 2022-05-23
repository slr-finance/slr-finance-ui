<template>
  <div class="flex flex-col items-stretch px-ui-page-inner-spacing py-24 border rounded-12 bg-black">
    <ui-galaxy-loader
      v-if="isFetchingWhiteList"
      class="w-full h-full"
    />
    <div v-else-if="!isJoined && isActivated">Тебя нет в вайт листе, покупай потом по фул прайсу</div>
    <template v-else>
      <div class="flex justify-between">
        <span class="text-gray">Buy</span>
        <div class="text-gray">
          Avb. <span class="text-violet">{{ bnbBalanceStr }}</span>
        </div>
      </div>
      <ui-input-bn
        v-model:value="amountIn"
        class="mt-6"
      >
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

      <div class="flex flex-col 500:flex-row justify-between text-14 mt-32">
        <span class="text-gray">Presale price</span>
        <presale-price
          :phase="currentPhase"
          class="text-white"
        />
      </div>

      <div class="flex flex-col 500:flex-row justify-between text-14 mt-12 mb-20">
        <div class="flex items-center">
          <ui-icon
            size="18"
            name="slr-logo"
          />
          <span class="text-gray ml-6">Your recieve </span>
        </div>
        <span class="text-white">{{ amountOutStr }}</span>
      </div>

      <connect-wallet-plug text="Connect wallet to take part in the presale">
        <send-tx-button
          @click="handleBuy"
          :txState="buyTxState"
          :disabled="isInsufficientBalance"
          size="40"
          variant="violet"
        >
          {{ isInsufficientBalance ? 'Insufficient BNB balance' : 'Buy' }}
        </send-tx-button>
      </connect-wallet-plug>
    </template>
  </div>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue'
  import BigNumber from 'bignumber.js'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import UiInputBn from '@/components/ui/UiInputBn.vue'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import PresalePrice from './PresalePrice.vue'
  import { useBuyPresaleToken } from '../hooks/useBuyPresaleToken'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { usePresale } from '../hooks/usePresale'
  import { useWhiteList } from '../hooks/useWhiteList'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'

  export default defineComponent({
    setup() {
      const { currentPhase, currentPhasePrice } = usePresale()
      const [, isJoined, isFetchingWhiteList] = useWhiteList()
      const { isActivated } = useEthers()
      const { balance: bnbBalance } = useEthers()
      const amountIn = ref(new BigNumber(0)) as Ref<BigNumber>
      const amountOut = computed(() => amountIn.value.div(currentPhasePrice.value)) as ComputedRef<BigNumber>
      const bnbBalanceStr = useTokenAmountFormat(bnbBalance, 'BNB')
      const amountOutStr = useTokenAmountFormat(amountOut, 'SLR')
      const isInsufficientBalance = computed(() => amountIn.value.gt(bnbBalance.value))

      const [handleBuy, buyTxState] = useBuyPresaleToken(amountIn, amountOut)

      const handleSetMaxAmount = () => {
        amountIn.value = bnbBalance.value
      }

      return {
        currentPhase,
        handleBuy,
        handleSetMaxAmount,
        amountIn,
        buyTxState,
        bnbBalanceStr,
        amountOutStr,
        isInsufficientBalance,
        isJoined,
        isFetchingWhiteList,
        isActivated,
      }
    },
    components: {
      UiInputBn,
      UiIcon,
      SendTxButton,
      ConnectWalletPlug,
      PresalePrice,
      UiGalaxyLoader,
    },
  })
</script>
