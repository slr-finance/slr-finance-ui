<template>
  <div class="pt-64">
    <connect-wallet-plug>
      <template #plug> Тут будет форма когда кошель подключишь </template>
      <div v-if="isFetching">Загрузка данных пресейла</div>
      <template v-else>
        presaleTokenBalance: {{ presaleTokenBalance }} {{ presaleTokenBalanceFetchingStatus }}

        <deposit-presale-token-form v-if="isPresaleEnded" />

        <presale-form
          v-if="!isPresaleEnded"
          :price="tokenPrice"
          :tokenOutAddress="tokenOutAddress"
          :tokenInDecimals="tokenInDecimals"
          :tokenOutDecimals="tokenOutDecimals"
        />
      </template>
    </connect-wallet-plug>
    <div>
      <div>Presale Rules</div>
      <ul>
        <li>
          The presale price is 1 BNB = 35,000 $THOREUM presale-token (~0.01$/$THOREUM presale-token, given 1BNB=$350).
          The price is same as CERBERUS presale price (a successful farm that has the same tokenomics as THOREUM) at the
          first day when their farm opened. CERBERUS went up much higher after 3 days to $0.05 until stabilize at around
          $0.02.
        </li>
        <li>
          Pancake listing price 50% higher than presale price: 1 BNB = 23,300 $THOREUM Official Token (~0.015$/THOREUM)
        </li>
        <li>
          3% BNB referral reward distributed instantly to referrer wallet via presale contract. Create your referral
          link on thoreum.finance/referrals
        </li>
        <li>Softcap: 50 BNB Hardcap: ~6,000 BNB</li>
        <li>No Contribution Limit ( you can buy any amount you want)</li>
        <li>
          Max duration: 3 days. If before 3 days hardcap reached we will consider the high demand to open Presale 2 with
          higher price than Presale 1. 40% of the Presale fund will be used for Thunder farming to distribute to THOREUM
          holders, so it is better for the community if we can raise more fund and satisfy high demand.
        </li>
      </ul>

      <div>Announcement about swapping $THOREUMPRE to $THOREUM Official Token after presale end:</div>
      <ul>
        <li>After you bought $THOREUMPRE, just HOLD it until presale end.</li>
        <li>$THOREUMPRE (presale token) are locked and cannot be traded/transferred until presale end</li>
        <li>All $THOREUM token you can buy on Pancakeswap before presale end is FAKE!</li>
        <li>Don't buy or sell $THOREUMPRE on Pancakeswap</li>
        <li>Don't add liquidity of $THOREUMPRE on Pancakeswap,it will NOT be usable.</li>
        <li>The only way to buy $THOREUMPRE is on thoreum.finance/presale</li>
        <li>Only after presale end, you can swap your $THOREUMPRE to the Official $THOREUM token at 1:1 ratio.</li>
        <li>
          You can go to thoreum.finance/referrals to get referrals link and refer your friend to presale to get 3% of
          their presale deposit
        </li>
        <li>
          Please hold $THOREUMPRE and wait for presale end and swap to $THOREUM (Official Token) on thoreum.finance/swap
        </li>
        <li>
          You can start to swap $THOREUMPRE to $THOREUM (Official Token) on presale end till forever ONLY on
          thoreum.finance/swap
        </li>
      </ul>

      <div>How to Take Part</div>
      <div>
        <div>Join Whitelist</div>
        <div>
          You have to join whitelist to take part in Thoreum Presale! Hurry UP ! Join the whitelist, before presale
          starts.
        </div>

        <div v-if="joined">You JOINED TO WHITE LIST!!!</div>
        <div v-else-if="isWhiteListClosed">isWhiteListClosed!!!!!!!</div>
        <div v-else>
          White List will be closed at
          <a
            :href="`https://bscscan.com/block/${endWhiteListBlock}`"
            target="_blank"
            rel="noreferrer"
            >{{ endWhiteListBlock }}</a
          >
          block number

          <connect-wallet-plug text="Connect wallet to join presale">
            <ui-button @click="handleJoinPresale"> Join Whitelist </ui-button>
          </connect-wallet-plug>
        </div>
      </div>
      <div>
        <div>Purchase THOREUM with BNB</div>
        <div>
          Presale starts, you can buy THOREUM with your BNB. When you bought, Your THOREUM tokens are sent to your
          account directly, Tokens are locked until presale end!.
        </div>
        {{ isPresaleEnded }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import PresaleForm from './components/PresaleForm.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import { usePresale } from './hooks/usePresale'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import DepositPresaleTokenForm from './components/DepositPresaleTokenForm.vue'
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
      } = usePresale()

      const [presaleTokenInfo] = useBalance(contractsAddresses.PresaleService)
      const presaleTokenBalance = computed(() => presaleTokenInfo.value.balance)
      const presaleTokenBalanceFetchingStatus = computed(() => presaleTokenInfo.value.fetchStatus)

      const handleJoinPresale = async () => {
        await joinPresale()
      }

      return {
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
    components: { PresaleForm, ConnectWalletPlug, UiButton, DepositPresaleTokenForm },
  })
</script>
