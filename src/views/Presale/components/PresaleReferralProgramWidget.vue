<template>
  <div
    class="presale-referral-program-widget border border-white border-opacity-30 rounded-18 bg-black min-h-[326px] flex flex-col pt-28 pl-ui-page-inner-spacing overflow-hidden"
  >
    <div class="flex items-center mr-ui-page-inner-spacing">
      <h3 class="text-white flex-1 text-28 font-title mr-4">referral program</h3>
      <ui-poligon
        corners="6"
        variant="orange"
        >earn</ui-poligon
      >
    </div>
    <p class="text-14 leading-[22px] text-white mt-20 mr-ui-page-spacing">
      Earn {{ referrerRewardPercentStr }} on your referral's investments, for all presale phases. Create your referral
      link on
      <ui-link :to="{ name: 'referral' }"> app.slr.finance/referrals </ui-link>
    </p>
    <div class="flex items-start mt-8">
      <ui-button
        class="z-1 mt-12"
        :size="48"
        variant="white"
        :to="{ name: 'referral' }"
        >Earn now</ui-button
      >
      <div class="bg-image ml-8 flex-1 h-full" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import { usePresale } from '../hooks/usePresale'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'

  export default defineComponent({
    name: 'presale-referral-program-widget',
    setup() {
      const { referrerRewardPercent } = usePresale()
      const referrerRewardPercentStr = usePercentFormat(referrerRewardPercent)

      return { referrerRewardPercentStr }
    },
    components: { UiButton, UiPoligon },
  })
</script>

<style scoped>
  .presale-referral-program-widget .bg-image {
    height: 140px;
    background-image: url('/presale/referral-bg.jpg');
    background-size: contain;
    background-position: right bottom;
    background-repeat: no-repeat;
  }
</style>
