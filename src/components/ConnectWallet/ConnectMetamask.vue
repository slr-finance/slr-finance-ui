<template>
  <connect-wallet-plug :size="buttonSize">
    <div
      @click="disconnect"
      class="bg-black/50 text-12 leading-none rounded-12 text-white pl-16 pr-6 h-48 flex justify-center items-center"
    >
      <div v-if="isBalanceLoaded && !isMobile">{{ balanceStr }}</div>
      <div class="ml-8 bg-black text-white/60 rounded-10 h-36 px-8 flex justify-center items-center">
        {{ trimedAddress }}
        <div
          v-if="!isMobile"
          class="bg-bnb w-20 h-20 flex justify-center items-center ml-6 rounded-4"
        >
          <ui-icon
            class="text-white"
            name="bnb-chain"
            size="14"
          />
        </div>
      </div>
    </div>
  </connect-wallet-plug>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { shortenAddress } from '@/utils/address/shortenAddress'
  import UiButton from '@/components/ui/UiButton.vue'
  import ConnectWalletPlug from './ConnectWalletPlug.vue'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { FetchingStatus } from '@/entities/common'
  import { useWallet } from '@/hooks/dapp/useWallet'

  export default defineComponent({
    props: {
      isMobile: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const { disconnect } = useWallet()
      const { address, chainId } = useEthers()
      const trimedAddress = computed(() => shortenAddress(address.value, props.isMobile ? 2 : 4))
      const isCorrectChainId = computed(() => chainId.value === 97)
      const [slrInfo] = useSlrBalance()
      const balance = computed(() => slrInfo.value.balance)
      const isBalanceLoaded = computed(() => slrInfo.value.fetchStatus === FetchingStatus.FETCHED)
      const balanceStr = useTokenAmountFormat(balance, 'SLR')
      const buttonSize = computed(() => (props.isMobile ? 36 : 48))

      return {
        isCorrectChainId,
        trimedAddress,
        disconnect,
        balanceStr,
        buttonSize,
        isBalanceLoaded,
      }
    },
    components: {
      UiButton,
      ConnectWalletPlug,
      UiIcon,
    },
  })
</script>
