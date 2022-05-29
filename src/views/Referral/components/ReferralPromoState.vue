<template>
  <div style="max-width: 850px">
    <connect-wallet-plug text="Unlock wallet to get your referral link" />

    <h2 class="text-white text-ui-page-title mb-24 mt-64 uppercase font-title">How to invite friends</h2>

    <div class="grid grid-cols-1 875:grid-cols-3 gap-24">
      <div>
        <h3 class="text-white text-ui-page-description mb-24 mt-64 uppercase font-title">Get a referral link</h3>
        Connect a wallet and generate your referral link in the Referral section.
      </div>
      <div>
        <h3 class="text-white text-ui-page-description mb-24 mt-64 uppercase font-title">Invite friends</h3>
        Invite your friends to register via your referral link
      </div>
      <div>
        <h3 class="text-white text-ui-page-description mb-24 mt-64 uppercase font-title">Earn crypto</h3>
        Receive referral rewards in SLR tokens from your friends’ earnings & swaps
      </div>
    </div>

    <div class="grid grid-cols-1 875:grid-cols-3 gap-24">
      <div>
        <h3 class="text-white text-ui-page-label mb-24 mt-64 uppercase font-title">Any transfers Referral Rewards</h3>
        <p>
          Gain
          <ui-text-placeholder
            :text="referrerPercentRewards.transferRewardStr"
            class="min-w-40"
          />
          from your friends’ swap commission each time your friend makes a transfer!
        </p>
      </div>
      <div>
        <h3 class="text-white text-ui-page-label mb-24 mt-64 uppercase font-title">Launchpools Referral Rewards</h3>
        <p>
          Get
          <ui-text-placeholder
            :text="referrerPercentRewards.stakingRewardStr"
            class="min-w-40"
          />
          of from friends’ profit obtained in Launchpools! The reward is only valid for the pool in which SLR is staked
          in return for more SLR.
        </p>
      </div>
      <div>
        <h3 class="text-white text-ui-page-label mb-24 mt-64 uppercase font-title">Swaps Referral Rewards</h3>
        <p>
          Get up to
          <ui-text-placeholder
            :text="referrerPercentRewards.buyRewardStr"
            class="min-w-40"
          />
          from friends’ swap commission each time your friend makes a swap! Receive your reward immediately after the
          swap is made.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import { useReferrerPercentRewards } from '../hooks/useReferrerPercentRewards'
  import UiTextPlaceholder from '@/components/ui/UiTextPlaceholder.vue'

  export default defineComponent({
    name: 'referral-promo-state',
    setup() {
      const referrerPercentRewards = useReferrerPercentRewards()

      return { referrerPercentRewards }
    },
    components: {
      ConnectWalletPlug,
      UiTextPlaceholder,
    },
  })
</script>
