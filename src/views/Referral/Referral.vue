<template>
  <div class="pt-64">
    <h1 class="text-38 ml-12 my-40 uppercase">Referral <span class="text-gray">station</span></h1>
    <connect-wallet-plug>
      <template #plug>
        Unlock wallet to get your unique referral link
        <connect-wallet-plug text="Unlock wallet" />
      </template>

      <template #default>
        <div class="875:flex 875:space-x-20 875:space-y-0 space-y-24 px-12">
          <referral-link-block class="flex-1 wrapper" />
          <referrer-rewards class="flex-1 wrapper" />
        </div>

        <div class="875:flex 875:space-x-20 875:space-y-0 space-y-24 px-12 pt-32">
          <referrals-list class="flex-1 wrapper" />
          <referrer-accrual-history class="flex-1 wrapper" />
        </div>
      </template>
    </connect-wallet-plug>

    <referral-faq class="600:block hidden px-12 mt-48" />
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

<style
  scoped
  lang="postcss"
>
  .wrapper {
    @apply 875:max-w-[408px];
  }
</style>
