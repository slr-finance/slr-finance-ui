<template>
  <div
    class="border border-white border-opacity-30 rounded-18 bg-black min-h-[326px] flex flex-col pt-28 pl-20 overflow-hidden"
  >
    <div class="flex items-center">
      <h3 class="text-white text-28 font-title mr-6">referral program</h3>
      <ui-poligon
        corners="6"
        variant="orange"
        >earn</ui-poligon
      >
    </div>
    <p class="text-14 leading-[22px] text-white mt-20 mr-6">
      1% BNB referral reward distributed instantly to referrer wallet via presale contract. Create your referral link on
      app.slr.finance/referrals
    </p>
    <div class="flex items-start relative mt-auto">
      <ui-button
        class="z-1 mb-[92px]"
        :size="48"
        variant="white"
        :to="{ name: 'referral' }"
        >Earn now</ui-button
      >
      <img
        class="absolute bottom-0"
        src="@/assets/astronaut.png"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'

  export default defineComponent({
    name: 'presale-referral-program-widget',
    components: { UiButton, UiPoligon },
  })
</script>
