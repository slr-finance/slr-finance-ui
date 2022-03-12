<template>
  <div class="grid grid-cols-2 gap-20">
    <div class="space-y-20">
      <ui-accordion title="Where do I get my referral link?">
        Connect a wallet and find your referral link in the Referral section.
      </ui-accordion>

      <ui-accordion title="How do I invite a referral friend?">
        Invite your friends to register via your referral link.
      </ui-accordion>

      <ui-accordion title="Are there separate balances for referral rewards from friends' Transfer fee, Launchpools?">
        No, there are one single balances for the referral rewards.
      </ui-accordion>

      <ui-accordion title="Can do I generate a new referral link?">
        No, there are one single referral link for the your address.
      </ui-accordion>

      <ui-accordion title="In what crypto currency the referral commission is accounted to my referral balance?">
        The referral rewards are accounted in SOLAR>FINANCE tokens only.
      </ui-accordion>

      <ui-accordion title="Are there fees for referral rewards withdrawal from referral balances?">
        Once you withdraw from your referral balances, a Transfer fee 10% will be charged.
      </ui-accordion>
    </div>

    <div class="space-y-20">
      <ui-accordion title="Are there fees for referral rewards withdrawal from referral balances?">
        Once you withdraw from your referral balances, a Transfer fee 10% will be charged.
      </ui-accordion>

      <ui-accordion title="Are there fees for referral rewards withdrawal from referral balances?">
        Once you withdraw from your referral balances, a Transfer fee 10% will be charged.
      </ui-accordion>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiAccordion from '@/components/ui/UiAccordion.vue'

  export default defineComponent({
    name: 'referral-faq',
    components: {
      UiAccordion,
    },
  })
</script>
