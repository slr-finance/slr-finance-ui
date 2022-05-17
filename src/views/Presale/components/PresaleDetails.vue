<template>
  <div
    class="bg-gray-300 bg-opacity-50 rounded-12 overflow-hidden relative w-full"
    :style="styleList"
  >
    <div class="px-24 875:flex items-start">
      <div class="pt-32 max-w-[390px] mr-24">
        <h4 class="font-title text-11 text-violet uppercase">information details</h4>
        <h3 class="font-title text-28 text-white uppercase mt-8">presale details</h3>
        <ul class="mt-24">
          <li>
            <span class="text-gray text-11 uppercase">listing</span>
            <p class="text-14 leading-[27px] text-white mt-2">Pancake listing price 50% higher than presale price: 1 BNB = 23,300 SLR Official Token (~0.015$/SLR)</p>
          </li>
          <li class="mt-16">
            <span class="text-gray text-11 uppercase">softcap</span>
            <p class="text-14 leading-[27px] text-white mt-2">50 BNB Hardcap: ~6,000 BNB</p>
            <p class="text-14 leading-[27px] text-white">No Contribution Limit ( you can buy any amount you want)</p>
          </li>
          <li class="mt-16">
            <span class="text-gray text-11 uppercase">max duration</span>
            <p class="text-14 leading-[27px] text-white mt-2">3 days. If before 3 days hardcap reached we will consider the high demand to open Presale 2 with higher price than Presale 1. 40% of the Presale fund will be used for Thunder farming to distribute to THOREUM holders, so it is better for the community if we can raise more fund and satisfy high demand.</p>
            <p class="text-14 leading-[27px] text-white mt-24">Announcement about swapping $SLRPRE to SLR Official Token after presale end: After you bought $SLRPRE, just HOLD it until presale end. $SLRPRE (presale token) are locked and cannot be traded/transferred until presale end</p>
          </li>
        </ul>
      </div>
      <presale-referral-program-widget class="mt-[22px]" />
    </div>
    <button
      class="w-full text-gray text-11 uppercase h-[44px] bottom-0"
      :class="[isOpen ? 'mt-24' : 'absolute']"
      type="button"
      style="backdrop-filter: blur(3px); background: rgba(15, 15, 15, 0.4);"
      @click="toggle(!isOpen)"
    >
      <div class="flex justify-center items-center font-title">
        <span>{{ isOpen ? 'hide' : 'show more' }}</span>
        <ui-icon class="ml-6" name="arrow-pixel" size="8" :rotate="isOpen ? 180 : 0" />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'
  import { useToggle } from '@vueuse/shared'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import PresaleReferralProgramWidget from './PresaleReferralProgramWidget.vue'

  export default defineComponent({
    name: 'presale-details',
    components: { PresaleReferralProgramWidget, UiButton, UiIcon },
    setup() {
      const [isOpen, toggle] = useToggle()

      const styleList = computed(() => ({
        height: unref(isOpen) ? 'auto' : '404px',
      }))

      return {
        styleList,
        isOpen,
        toggle,
      }
    },
  })
</script>
