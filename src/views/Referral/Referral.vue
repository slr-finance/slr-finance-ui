<template>
  <div class="pt-64">
    <h1 class="text-38 mb-40 uppercase">Referral <span class="text-gray">station</span></h1>
    <connect-wallet-plug>
      <template #plug>
        Unlock wallet to get your unique referral link
        <connect-wallet-plug text="Unlock wallet" />
      </template>

      <template #default>
        <div class="flex space-x-20">
          <referral-link-block style="width: 408px" />
          <referrer-rewards style="width: 408px" />
        </div>

        <div class="flex space-x-20 pt-32">
          <referrals-list class="flex-1" />
          <referrer-accrual-history class="flex-1" />
        </div>
      </template>
    </connect-wallet-plug>

    <referral-faq class="mt-48" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import ReferralsList from './components/ReferralsList.vue'
  import ReferralLinkBlock from './components/ReferralLinkBlock.vue'
  import ReferrerRewards from './components/ReferrerRewards.vue'
  import ReferrerAccrualHistory from './components/ReferrerAccrualHistory.vue'
  import ReferralFaq from './components/ReferralFaq.vue'

  export default defineComponent({
    setup() {},
    components: {
      ConnectWalletPlug,
      ReferralsList,
      ReferralLinkBlock,
      ReferrerRewards,
      ReferrerAccrualHistory,
      ReferralFaq,
    },
  })
</script>
