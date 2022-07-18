<template>
  <ui-widget class="relative">
    <template #bage>
      <ui-poligon
        variant="violet"
        animated
      >
        Share
      </ui-poligon>
    </template>
    <div class="pt-12 pb-20">
      <p class="mb-18 text-14">
        Share link and <span class="text-yellow">Get 10%</span> from perfomance fee for any transactions and
        <span class="text-yellow">1%</span> from any rawards
      </p>
      <referral-link :link="referralLink" />
      <div class="flex items-center justify-between mt-18">
        Share link
        <social-links
          v-if="referralLink"
          :link="referralLink"
          :text="text"
          :hashtags="hashtags"
        />
        <ui-text-placeholder
          v-else
          class="w-80"
        />
      </div>
    </div>
  </ui-widget>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import ReferralLink from './ReferralLink.vue'
  import SocialLinks from '@/components/SocialLinks/SocialLinks.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import { useReferralLink } from '../hooks/useReferralLink'
  import UiTextPlaceholder from '@/components/ui/UiTextPlaceholder.vue'

  export default defineComponent({
    name: 'referrals-link-block',
    setup() {
      const referralLinkData = useReferralLink()
      const referralLink = computed(() => {
        const { value } = referralLinkData

        if (!value.isValid) {
          return null
        }

        if (value.fetched) {
          return value.short ? value.short : value.full
        }

        return null
      })

      return {
        referralLink,
        text: 'Revolutionary financial protocol operating in BSC with Auto-Compounding, Auto-Liquidity mechanisms, Auto-Investing and limitless buyback.',
        hashtags: ['DeFi', 'Yield', 'Farming', 'Investments', 'SLR', 'SlrFinance'],
      }
    },
    components: {
      UiWidget,
      UiPoligon,
      UiTextPlaceholder,
      ReferralLink,
      SocialLinks,
    },
  })
</script>
