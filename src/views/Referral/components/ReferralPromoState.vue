<template>
  <div
    style="max-width: 850px"
    class="referral-promo-state flex"
  >
    <div class="w-2 bg-white 875:ml-12 mr-ui-page-inner-spacing justify-self-stretch shrink-0" />

    <div class="space-y-20">
      <h2 class="text-ui-page-label uppercase font-title">How to invite friends</h2>

      <div class="item-block 500:flex">
        <ui-icon
          :size="20"
          class="item-point"
          name="center"
        />
        <div class="flex 500:mr-16 flex-1">
          <ui-icon
            :size="40"
            class="icon"
            name="app-broken-link"
          />
          <div class="flex-1">
            <h3 class="title">Get a referral link</h3>
            <p class="content">Connect a wallet and generate your referral link in the Referral section.</p>
          </div>
        </div>

        <div class="self-center flex-shrink-0 mt-16 500:mt-0">
          <connect-wallet-plug
            text="Connect wallet"
            :size="40"
          />
        </div>
      </div>

      <div class="item-block flex">
        <ui-icon
          :size="20"
          class="item-point"
          name="center"
        />
        <ui-icon
          :size="40"
          class="icon"
          name="app-circles"
        />
        <div class="flex-1">
          <h3 class="title">Invite friends</h3>
          <p class="content">Invite your friends to register via your referral link</p>
        </div>
      </div>

      <div class="item-block">
        <ui-icon
          :size="20"
          class="item-point"
          name="center"
        />
        <div class="flex mb-20">
          <ui-icon
            :size="40"
            class="icon"
            name="app-layers"
          />
          <div>
            <h3 class="title">Earn crypto</h3>
            <p class="content">Receive referral rewards in SLR tokens from your friends’ earnings & swaps</p>
          </div>
        </div>

        <div class="grid grid-cols-1 875:grid-cols-3 gap-16">
          <div class="item-sub-block">
            <h3 class="title">Any transfers Referral Rewards</h3>
            <p class="content mb-6">
              Gain
              <ui-text-placeholder
                :text="referrerPercentRewards.transferRewardStr"
                class="min-w-40"
              />
              from your friends’ swap commission each time your friend makes a transfer!
            </p>

            <ui-external-link> Read more </ui-external-link>
          </div>
          <div class="item-sub-block">
            <h3 class="title">Launchpools Referral Rewards</h3>
            <p class="content mb-6">
              Get
              <ui-text-placeholder
                :text="referrerPercentRewards.stakingRewardStr"
                class="min-w-40"
              />
              of from friends’ profit obtained in Launchpools! The reward is only valid for the pool in which SLR is
              staked in return for more SLR.
            </p>

            <ui-external-link> Read more </ui-external-link>
          </div>
          <div class="item-sub-block">
            <h3 class="title">Swaps Referral Rewards</h3>
            <p class="content mb-6">
              Get up to
              <ui-text-placeholder
                :text="referrerPercentRewards.buyRewardStr"
                class="min-w-40"
              />
              from friends’ swap commission each time your friend makes a swap! Receive your reward immediately after
              the swap is made.
            </p>

            <ui-external-link> Read more </ui-external-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import { useReferrerPercentRewards } from '../hooks/useReferrerPercentRewards'
  import UiTextPlaceholder from '@/components/ui/UiTextPlaceholder.vue'
  import UiIcon from '@/components/ui/UiIcon/UiIcon.vue'
  import UiExternalLink from '@/components/ui/UiExternalLink.vue'

  export default defineComponent({
    name: 'referral-promo-state',
    setup() {
      const referrerPercentRewards = useReferrerPercentRewards()

      return { referrerPercentRewards }
    },
    components: {
      ConnectWalletPlug,
      UiTextPlaceholder,
      UiIcon,
      UiExternalLink,
    },
  })
</script>

<style lang="postcss">
  .referral-promo-state .item-block,
  .referral-promo-state .item-sub-block {
    @apply rounded-12 bg-gray-800 bg-opacity-60;
  }

  .referral-promo-state .item-block .content,
  .referral-promo-state .item-sub-block .content {
    @apply text-white text-opacity-50 text-14;
  }

  .referral-promo-state .item-block .title,
  .referral-promo-state .item-sub-block .title {
    @apply text-white text-14 mb-8;
  }

  .referral-promo-state .item-block {
    @apply p-20 relative;
  }

  .referral-promo-state .item-sub-block {
    @apply p-16;
  }

  .referral-promo-state .item-block .item-point {
    @apply absolute top-32 -left-ui-page-inner-spacing p-6 bg-black transform -translate-x-1/2 box-content -ml-1 rounded-full;
  }

  .referral-promo-state .item-block .icon {
    @apply self-center mr-16 shrink-0;
  }
</style>
