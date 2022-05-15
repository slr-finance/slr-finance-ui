<template>
  <div class="px-ui-page-spacing pt-ui-page-header-spacing pb-ui-page-bottom-spacing flex relative z-ui-page-content">
    <div
      v-if="isShownBackButton"
      class="pr-ui-page-spacing flex-shrink-0 w-72 box-content flex justify-center items-start"
    >
      <ui-button
        size="50"
        class="w-50 h-50 rounded-16"
        variant="gray"
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
    <div class="flex-1 w-full">
      <div class="mb-40 flex justify-between items-start">
        <div>
          <h1 class="text-ui-page-title uppercase font-title leading-140">
            Referral <span class="text-gray">station</span>
          </h1>
          <p class="text-gray text-ui-page-description mt-12">
            Earn up to 10% from friends’ preformane fees on SLR and 10% from their earnings on Launchpools
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
          <div class="content-layout">
            <referral-link-block />
            <referrer-rewards />
            <referrals-list />
            <referrer-accrual-history />
          </div>
        </template>
      </connect-wallet-plug>

      <referral-faq class="600:block hidden mt-48" />
    </div>
  </div>
  <referral-bg v-if="isShownBgVideo" />
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
  import ReferrerAccrualHistory from './components/ReferrerAccrualHistory/ReferrerAccrualHistory.vue'
  import ReferralFaq from './components/ReferralFaq.vue'
  import ReferralBg from './components/ReferralBg.vue'

  export default defineComponent({
    setup() {
      const { isShownBackButton, isShownBreadCrumbs, isShownBgVideo } = useBreakpoints({
        isShownBackButton: 980,
        isShownBreadCrumbs: 875,
        isShownBgVideo: 1200,
      })

      return {
        isShownBackButton,
        isShownBreadCrumbs,
        isShownBgVideo,
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
  .content-layout {
    display: grid;
    grid-gap: 32px 20px;
    grid-template-areas:
      'link rewards'
      'referrals history';

    grid-template-columns: repeat(2, minmax(270px, 1fr));
    grid-template-rows: 227px 380px;
    max-width: 850px;
  }

  @media screen and (max-width: 875px) {
    .content-layout {
      grid-template-areas:
        'link'
        'rewards'
        'referrals'
        'history';
      grid-template-columns: 100%;
      grid-template-rows: repeat(2, minmax(227px, max-content)) 380px minmax(380px, max-content);
    }
  }
</style>
