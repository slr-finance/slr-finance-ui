<template>
  <div class="referral-faq">
    <h3 class="text-white text-ui-page-label mb-24 uppercase font-title">FAQ</h3>
    <div
      class="grid grid-cols-1 875:grid-cols-2 gap-20"
      style="max-width: 836px"
    >
      <div class="space-y-20">
        <ui-accordion title="Where do I get my referral link?">
          Connect a wallet and find your referral link in the Referral section.
        </ui-accordion>

        <ui-accordion title="How do I invite a referral friend?">
          <p class="p">Invite your friends to register via your referral link.</p>
          <p class="p">
            Your friends will be added to your referral list when they follow the referral link and make their first
            interaction with the contract. (for example, when they take part in a presale or stake SLR tokens)
          </p>
        </ui-accordion>

        <ui-accordion title="Are there separate balances for referral rewards from friends' Transfer fee, Launchpools?">
          No, there are one single balances for the referral rewards.
        </ui-accordion>

        <ui-accordion title="Can do I generate a new referral link?">
          No, there are one single referral link for the your address.
        </ui-accordion>

        <ui-accordion title="In what crypto currency the referral commission is accounted to my referral balance?">
          The referral rewards are accounted in SLR tokens only.
        </ui-accordion>
      </div>

      <div class="space-y-20">
        <ui-accordion title="Are there fees for referral rewards withdrawal from referral balances?">
          Once you withdraw from your referral balances, a Transfer fee
          <ui-text-placeholder
            class="min-w-40"
            :text="referralRewards.transferRewardStr"
          />
          will be charged.
        </ui-accordion>
        <ui-accordion title="How much crypto can I earn via the Referral Program?">
          <ul class="list">
            <li>
              Buy pre-sale =
              <ui-text-placeholder
                class="min-w-40"
                :text="referralRewards.presaleRewardStr"
              />
              of the amount of purchased tokens
            </li>
            <li>
              Sell SLR =
              <ui-text-placeholder
                class="min-w-40"
                :text="referralRewards.sellRewardStr"
              />
              of performance fees
            </li>
            <li>
              Buy SLR =
              <ui-text-placeholder
                class="min-w-40"
                :text="referralRewards.buyRewardStr"
              />
              of performance fees
            </li>
            <li>
              Transfer SLR =
              <ui-text-placeholder
                class="min-w-40"
                :text="referralRewards.transferRewardStr"
              />
              of performance fees
            </li>
            <li>
              Claim staking Reward =
              <ui-text-placeholder
                class="min-w-40"
                :text="referralRewards.stakingRewardStr"
              />
              of profit
            </li>
          </ul>
        </ui-accordion>

        <ui-accordion title="Is Referral Program Active for all Launchpools?">
          No. Referral Program is active only for Stake SLR.
        </ui-accordion>
        <ui-accordion title="When will I get my referral reward from Farms & Launchpools?">
          You will get your referral reward the moment your friend makes Harvest.
        </ui-accordion>
        <ui-accordion title="Can I profit from the Referral Program without any investments from my side?">
          Yes, you can earn up to
          <ui-text-placeholder
            class="min-w-40"
            :text="referralRewards.buyRewardStr"
          />
          of performance fees from swaps and
          <ui-text-placeholder
            class="min-w-40"
            :text="referralRewards.stakingRewardStr"
          />
          of rewards from Farms & Launchpools without any required investments from your side.
        </ui-accordion>
      </div>
    </div>

    <h3 class="text-white text-ui-page-label mb-24 mt-64 uppercase font-title">Any other questions?</h3>
    <p>
      Want to learn more:
      <ui-external-link href="https://docs.slr.finance/fundamentals/referral-program"> Documentation </ui-external-link>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiAccordion from '@/components/ui/UiAccordion.vue'
  import UiTextPlaceholder from '@/components/ui/UiTextPlaceholder.vue'
  import { useReferrerPercentRewards } from '../hooks/useReferrerPercentRewards'
  import UiExternalLink from '@/components/ui/UiExternalLink.vue'

  export default defineComponent({
    name: 'referral-faq',
    setup() {
      const referralRewards = useReferrerPercentRewards()

      return { referralRewards }
    },
    components: {
      UiAccordion,
      UiTextPlaceholder,
      UiExternalLink,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .referral-faq .p {
    @apply mb-12;
  }

  .referral-faq .list > li {
    @apply mb-8;
  }
</style>
