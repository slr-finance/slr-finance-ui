<template>
  <div
    class="relative flex"
  >
    <div class="relative flex-1 w-full">
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
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { useHead } from '@vueuse/head'
  import { useToggle } from '@vueuse/core'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import UiIcon from '@/components/ui/UiIcon'
  import ReferralsList from './components/ReferralsList.vue'
  import ReferralLinkBlock from './components/ReferralLinkBlock.vue'
  import ReferrerRewards from './components/ReferrerRewards.vue'
  import ReferrerAccrualHistory from './components/ReferrerAccrualHistory/ReferrerAccrualHistory.vue'
  import ReferralFaq from './components/ReferralFaq.vue'
  import ReferralPromoState from './components/ReferralPromoState.vue'
  import ReferralFullMobileTable from './components/ReferralFullMobileTable.vue'
  import ReferralPageTitle from './components/ReferralPageTitle.vue'
  import ReferralWidgetTitle from './components/ReferralWidgetTitle.vue'
  import ReferralListTitle from './components/ReferralListTitle.vue'
  import { useAppBreakpoints } from '@/hooks/useAppBreakpoints'

  export default defineComponent({
    setup() {
      useHead({
        title: 'SLR Referral Program',
        meta: [
          {
            name: 'description',
            content: 'SLR Referral Program',
          },
        ],
      })

      // Adaptive [BEGIN]
      const { w1200: isShownBgVideo, w875: isDesktopLayout, w980: isShownBackButton } = useAppBreakpoints()
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
      ReferralPromoState,
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
