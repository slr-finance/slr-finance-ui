<template>
  <div class="pt-64 px-ui-page-spacing mt-64 flex relative z-ui-page-content">
    <div
      v-if="isShownBackButton"
      class="pr-ui-page-spacing flex-shrink-0 w-72 box-content flex justify-center items-start"
    >
      <ui-button
        size="50"
        class="w-50 h-50 rounded-16"
        variant="gray-800"
        :to="{ name: 'dashboard' }"
      >
        <div class="flex justify-center items-center">
          <ui-icon
            name="arrow-pixel"
            class="rotate-90"
            size="14"
          />
        </div>
      </ui-button>
    </div>
    <div class="flex-1">
      <div class="mb-40 flex justify-between items-start">
        <div>
          <h1 class="text-38 uppercase font-title leading-none">Referral <span class="text-gray">station</span></h1>
          <p class="text-gray text-16 mt-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>
        <ui-bread-crumbs
          v-if="isShownBreadCrumbs"
          :items="[
            { to: { name: 'dashboard' }, text: 'Home' },
            { to: { name: 'referral' }, text: 'Referral' },
          ]"
        />
      </div>
      <connect-wallet-plug>
        <template #plug>
          Unlock wallet to get your unique referral link
          <connect-wallet-plug text="Unlock wallet" />
        </template>

        <template #default>
          <div class="875:flex 875:space-x-20 875:space-y-0 space-y-24">
            <referral-link-block class="flex-1 wrapper" />
            <referrer-rewards class="flex-1 wrapper" />
          </div>

          <div class="875:flex 875:space-x-20 875:space-y-0 space-y-24 pt-32">
            <referrals-list class="flex-1 wrapper" />
            <referrer-accrual-history class="flex-1 wrapper" />
          </div>
        </template>
      </connect-wallet-plug>

      <referral-faq class="600:block hidden mt-48" />
    </div>
  </div>
  <referral-bg v-once />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useBreakpoints } from '@vueuse/core'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import UiBreadCrumbsAsync from '@/components/ui/UiBreadCrumbs/UiBreadCrumbsAsync'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import ReferralsList from './components/ReferralsList.vue'
  import ReferralLinkBlock from './components/ReferralLinkBlock.vue'
  import ReferrerRewards from './components/ReferrerRewards.vue'
  import ReferrerAccrualHistory from './components/ReferrerAccrualHistory.vue'
  import ReferralFaq from './components/ReferralFaq.vue'
  import ReferralBg from './components/ReferralBg.vue'

  export default defineComponent({
    setup() {
      const { isShownBackButton, isShownBreadCrumbs } = useBreakpoints({
        isShownBackButton: 980,
        isShownBreadCrumbs: 875,
      })

      return {
        isShownBackButton,
        isShownBreadCrumbs,
      }
    },
    components: {
      ConnectWalletPlug,
      ReferralsList,
      ReferralLinkBlock,
      ReferrerRewards,
      ReferrerAccrualHistory,
      ReferralFaq,
      ReferralBg,
      UiBreadCrumbs: UiBreadCrumbsAsync,
      UiButton,
      UiIcon,
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
