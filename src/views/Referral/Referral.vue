<template>
  <div
    class="px-ui-page-spacing pt-ui-page-header-spacing pb-ui-page-bottom-spacing flex relative z-ui-page-content flex-1"
  >
    <div
      v-if="isShownBackButton"
      class="pr-ui-page-spacing flex-shrink-0 w-72 box-content flex justify-center items-start"
    >
      <ui-button
        size="48"
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
      <connect-wallet-plug>
        <template #plug>
          <referral-page-title :isDesktopLayout="isDesktopLayout" />
          <referral-promo-state />
        </template>

        <template #default>
          <transition
            mode="out-in"
            name="fade"
          >
            <referral-full-mobile-table
              v-if="isShownFullMobileAccrualHistoryTable"
              @close="closeAllMobileTable"
            >
              <template #title>
                <referral-widget-title title="Accrual history" />
              </template>
              <referrer-accrual-history class="flex-1" />
            </referral-full-mobile-table>

            <referral-full-mobile-table
              v-else-if="isShownFullMobileReferralsTable"
              @close="closeAllMobileTable"
            >
              <template #title>
                <referral-list-title />
              </template>
              <referrals-list class="flex-1" />
            </referral-full-mobile-table>

            <template v-else>
              <div class="content-layout">
                <referral-page-title :isDesktopLayout="isDesktopLayout" />
                <referral-link-block />
                <referrer-rewards />
                <div class="flex flex-col">
                  <referral-list-title class="mb-24" />
                  <referrals-list
                    class="flex-1"
                    @show-all="showFullMobileReferralsTable"
                    :is-slicing-rows="!isDesktopLayout"
                  />
                </div>
                <div class="flex flex-col">
                  <referral-widget-title
                    class="mb-24"
                    title="Accrual history"
                  />
                  <referrer-accrual-history class="flex-1" />
                </div>
              </div>
            </template>
          </transition>
        </template>
      </connect-wallet-plug>

      <referral-faq
        class="mt-48"
        v-if="!isShownFullMobileAccrualHistoryTable && !isShownFullMobileReferralsTable"
      />
    </div>
  </div>
  <referral-bg v-if="isShownBgVideo" />
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { useBreakpoints, useToggle } from '@vueuse/core'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon'
  import ReferralsList from './components/ReferralsList.vue'
  import ReferralLinkBlock from './components/ReferralLinkBlock.vue'
  import ReferrerRewards from './components/ReferrerRewards.vue'
  import ReferrerAccrualHistory from './components/ReferrerAccrualHistory/ReferrerAccrualHistory.vue'
  import ReferralFaq from './components/ReferralFaq.vue'
  import ReferralBg from './components/ReferralBg.vue'
  import ReferralPromoState from './components/ReferralPromoState.vue'
  import ReferralFullMobileTable from './components/ReferralFullMobileTable.vue'
  import ReferralPageTitle from './components/ReferralPageTitle.vue'
  import ReferralWidgetTitle from './components/ReferralWidgetTitle.vue'
  import ReferralListTitle from './components/ReferralListTitle.vue'

  export default defineComponent({
    setup() {
      // Adaptive [BEGIN]
      const { isShownBackButton, isDesktopLayout, isShownBgVideo } = useBreakpoints({
        isShownBackButton: 980,
        isDesktopLayout: 875,
        isShownBgVideo: 1200,
      })

      const [isShownFullMobileAccrualHistoryTable, toggleFullMobileAccrualHistoryTable] = useToggle(false)
      const [isShownFullMobileReferralsTable, toggleFullMobileReferralsTable] = useToggle(false)
      const closeAllMobileTable = () => {
        toggleFullMobileAccrualHistoryTable(false)
        toggleFullMobileReferralsTable(false)
      }
      const showFullMobileRewardsTable = () => toggleFullMobileAccrualHistoryTable(true)
      const showFullMobileReferralsTable = () => toggleFullMobileReferralsTable(true)

      watch(isDesktopLayout, (isDesktopLayoutVal) => isDesktopLayoutVal && closeAllMobileTable())
      // Adaptive [END]

      return {
        isShownBackButton,
        isDesktopLayout,
        isShownBgVideo,

        isShownFullMobileAccrualHistoryTable,
        isShownFullMobileReferralsTable,
        closeAllMobileTable,
        showFullMobileRewardsTable,
        showFullMobileReferralsTable,
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
      ReferralPromoState,
      UiButton,
      UiIcon,
      ReferralFullMobileTable,
      ReferralPageTitle,
      ReferralWidgetTitle,
      ReferralListTitle,
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
      'header header'
      'link rewards'
      'referrals history';
    grid-template-columns: repeat(2, minmax(270px, 1fr));
    grid-template-rows: min-content 227px 380px;
    max-width: 850px;
  }

  @media screen and (max-width: 875px) {
    .content-layout {
      grid-template-areas:
        'header'
        'link'
        'rewards'
        'referrals'
        'history';
      grid-template-columns: 100%;
      grid-template-rows: min-content repeat(2, minmax(227px, max-content)) 380px minmax(380px, max-content);
    }
  }
</style>
