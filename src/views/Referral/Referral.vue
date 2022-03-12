<template>
  <div class="pt-64">
    <div>Get 10% from performance fee for any transactions</div>
    <div>and 1% from any rewards</div>

    <connect-wallet-plug>
      <template #plug>
        Unlock wallet to get your unique referral link
        <connect-wallet-plug text="Unlock wallet" />
      </template>

      <template #default>
        <own-inviter />

        <referrer-rewads />

        <referral-link />

        <div class="flex pt-32">
          <referrals-list class="flex-1" />
          <referrer-accrual-history class="flex-1" />
        </div>
      </template>
    </connect-wallet-plug>

    <referral-faq />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import ReferralsList from './components/ReferralsList.vue'
  import ReferralLink from './components/ReferralLink.vue'
  import ReferrerRewads from './components/ReferrerRewads.vue'
  import ReferrerAccrualHistory from './components/ReferrerAccrualHistory.vue'
  import ReferralFaq from './components/ReferralFaq.vue'
  import OwnInviter from './components/OwnInviter.vue'

  export default defineComponent({
    setup() {},
    components: {
      ConnectWalletPlug,
      ReferralsList,
      ReferralLink,
      ReferrerRewads,
      ReferrerAccrualHistory,
      ReferralFaq,
      OwnInviter,
    },
  })
</script>
