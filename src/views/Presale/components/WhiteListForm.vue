<template>
  <ui-widget>
    <template #bage>
      <ui-poligon
        variant="green-original"
        animated
      >
        {{ isJoined ? 'Joined' : 'Open' }}
      </ui-poligon>
    </template>

    <transition
      mode="out-in"
      name="fade"
    >
      <ui-galaxy-loader
        v-if="isFetching"
        class="w-full h-full"
      />

      <div v-else>
        <p class="text-gray text-16 leading-none mb-12">White list open</p>
        <p class="text-white text-24 leading-none font-title uppercase mb-16">Join to whitelist</p>

        <div class="inline-block bg-green-original rounded-full px-8 py-4 leading-none text-14 mb-16">
          {{ priceStr }} SLR per 1 BNB
        </div>

        <connect-wallet-plug text="Connect wallet to join the whitelist">
          <send-tx-button
            class="w-full"
            variant="violet"
            size="48"
            :txState="joinTxState"
            @click="handleJoin"
          >
            Join now!
          </send-tx-button>
        </connect-wallet-plug>
      </div>
    </transition>
  </ui-widget>
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import { useJoinWhiteList } from '../hooks/useJoinWhiteList'
  import { useWhiteList } from '../hooks/useWhiteList'
  import { usePresale } from '../hooks/usePresale'
  import { BIG_ONE } from '@/utils/bigNumber'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'

  export default defineComponent({
    name: 'white-list-form',
    setup() {
      const [handleJoin, joinTxState] = useJoinWhiteList()
      const [refetch, isJoined, isFetching] = useWhiteList()
      const { prices } = usePresale()
      const price = computed(() => BIG_ONE.div(prices.value[0]))
      const priceStr = useTokenAmountFormat(price)

      watch(joinTxState, ({ isSuccess }) => isSuccess && refetch())

      return {
        handleJoin,
        joinTxState,
        priceStr,
        isJoined,
        isFetching,
      }
    },
    components: {
      UiGalaxyLoader,
      UiPoligon,
      UiWidget,
      SendTxButton,
      ConnectWalletPlug,
    },
  })
</script>
