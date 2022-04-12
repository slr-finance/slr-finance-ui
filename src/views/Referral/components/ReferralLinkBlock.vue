<template>
  <ui-widget class="relative">
    <div class="px-8 pt-12 pb-20">
      <p class="mb-18">
        Share link and <span class="text-yellow">Get 10%</span> from perfomance fee for any transactions and
        <span class="text-yellow">1%</span> from any rawards
      </p>
      <referral-link />
      <div class="flex items-center justify-between mt-18">
        Share link
        <social-links />
      </div>
      <ui-poligon
        class="absolute transform translate-x-18 -translate-y-1/2 top-0 right-0"
        variant="violet"
        animated
      >
        Share
      </ui-poligon>
    </div>
  </ui-widget>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import ReferralLink from './ReferralLink.vue'
  import SocialLinks from '@/components/SocialLinks/SocialLinks.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'

  export default defineComponent({
    name: 'referrals-link-block',
    components: {
      UiWidget,
      ReferralLink,
      SocialLinks,
      UiPoligon,
    },
  })
</script>
