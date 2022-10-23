<template>
  <div class="flex flex-col">
    <div class="flex-1">
      <p class="text-gray text-16 leading-none mb-12">White list open</p>
      <p class="text-white text-24 leading-none font-title uppercase mb-16">Join to whitelist</p>

      <p class="mb-8 text-16">
        Taking part in whitelisted pre-sale makes investors part of a privileged group of individuals who are buying
        tokens before anyone else.
      </p>
      <presale-price
        :phase="1"
        class="inline-block bg-green-original rounded-full px-8 py-4 leading-none text-14 mb-16"
      />
    </div>

    <connect-wallet-plug text="Connect wallet to join the whitelist">
      <send-tx-button
        class="w-full"
        variant="violet"
        :size="48"
        :txState="joinTxState"
        @click="handleJoin"
      >
        Join now!
      </send-tx-button>
    </connect-wallet-plug>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import { usePresale } from '../../hooks/usePresale'
  import { BIG_ONE } from '@/utils/bigNumber'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useWhiteList } from '../../hooks/useWhiteList'
  import { useJoinWhiteList } from '../../hooks/useJoinWhiteList'
  import PresalePrice from '../PresalePrice.vue'

  export default defineComponent({
    name: 'white-list-join',
    setup() {
      const [refetch] = useWhiteList()
      const [handleJoin, joinTxState] = useJoinWhiteList()
      const { prices } = usePresale()
      const price = computed(() => BIG_ONE.div(prices.value[0]))
      const priceStr = useTokenAmountFormat(price)

      watch(joinTxState, ({ isSuccess }) => isSuccess && refetch())

      return {
        priceStr,
        handleJoin,
        joinTxState,
      }
    },
    components: {
      SendTxButton,
      ConnectWalletPlug,
      PresalePrice,
    },
  })
</script>
