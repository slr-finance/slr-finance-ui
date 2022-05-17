<template>
  <div class="px-ui-page-spacing pt-ui-page-header-spacing pb-ui-page-bottom-spacing flex flex-col flex-1">
    <div
      class="w-full h-full flex-1 flex justify-center items-center"
      v-if="isFetching"
    >
      <ui-galaxy-loader />
    </div>
    <div
      v-else
      class="flex flex-col items-center max-w-[800px] mx-auto"
    >
      <div class="text-center">
        <h1 class="text-ui-page-title text-white uppercase font-title">
          <span class="text-gray">phase-{{ phase }}</span>
          space presale
        </h1>
        <p class="text-ui-page-description text-gray max-w-[433px] mt-10">
          Three-phase ITO using "overflow" method to make sure everyone will have a spot in the presale.
        </p>
      </div>
      <div class="875:flex w-full mt-24">
        <div class="flex-1">
          <connect-wallet-plug>
            <template #plug> Тут будет форма когда кошель подключишь </template>
            <div v-if="isFetching">Загрузка данных пресейла</div>
            <template v-else>
              <!-- presaleTokenBalance: {{ presaleTokenBalance }} {{ presaleTokenBalanceFetchingStatus }} -->

              <deposit-presale-token-form v-if="!isPresaleEnded" />

              <presale-form
                v-else
                :price="tokenPrice"
                :tokenOutAddress="tokenOutAddress"
                :tokenInDecimals="tokenInDecimals"
                :tokenOutDecimals="tokenOutDecimals"
              />
            </template>
          </connect-wallet-plug>
        </div>
        <presale-information class="flex-1 875:ml-28 875:mt-0 mt-24" />
      </div>
      <presale-details class="mt-28" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import PresaleForm from './components/PresaleForm.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import { usePresale } from './hooks/usePresale'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import DepositPresaleTokenForm from './components/DepositPresaleTokenForm.vue'
  import PresaleDetails from './components/PresaleDetails.vue'
  import PresaleInformation from './components/PresaleInformation.vue'
  import { useBalance } from '@/store/hooks/useBalance'

  export default defineComponent({
    name: 'presale-view',
    setup() {
      const {
        tokenInDecimals,
        tokenOutDecimals,
        isFetching,
        isWhiteListClosed,
        isPresaleEnded,
        joinPresale,
        joined,
        endWhiteListBlock,
        tokenPrice,
        tokenOutAddress,
        phase,
      } = usePresale()

      const [presaleTokenInfo] = useBalance(contractsAddresses.PresaleService)
      const presaleTokenBalance = computed(() => presaleTokenInfo.value.balance)
      const presaleTokenBalanceFetchingStatus = computed(() => presaleTokenInfo.value.fetchStatus)

      const handleJoinPresale = async () => {
        await joinPresale()
      }

      return {
        phase,
        isFetching,
        tokenOutAddress,
        isWhiteListClosed,
        isPresaleEnded,
        presaleTokenBalance,
        presaleTokenBalanceFetchingStatus,
        joined,
        endWhiteListBlock,
        tokenPrice,
        handleJoinPresale,
        tokenInDecimals,
        tokenOutDecimals,
      }
    },
    components: {
      PresaleForm,
      ConnectWalletPlug,
      UiButton,
      DepositPresaleTokenForm,
      PresaleDetails,
      PresaleInformation,
      UiGalaxyLoader,
    },
  })
</script>
