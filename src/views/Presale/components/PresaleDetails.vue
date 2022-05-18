<template>
  <div
    class="presale-details bg-gray-300 bg-opacity-50 rounded-12 overflow-hidden relative w-full"
    :class="classList"
  >
    <div class="wrapper px-ui-page-inner-spacing items-start">
      <div class="content pt-32 mr-24">
        <h4 class="font-title text-11 text-violet uppercase">information details</h4>
        <h3 class="font-title text-28 text-white uppercase mt-8">presale details</h3>
        <ul class="mt-24">
          <li>
            <span class="text-gray text-11 uppercase">What is the ITO “Overflow” sale method?</span>
            <p class="text-14 leading-[27px] text-white mt-2">
              Basically, the more you put in, the more you will get, and you’ll get back anything that doesn’t get
              spent. In the “Overflow” method, it's not warrantied that user will get 100% of the amount they commit.
              The user's final allocation will be based on the amount of funds they put in as a percentage of all funds
              put in by other users at the time the sale ends. Users will receive back any unspent funds when they claim
              their tokens after the sale.
            </p>
          </li>
          <li>
            <span class="text-gray text-11 uppercase">listing</span>
            <p class="text-14 leading-[27px] text-white mt-2">
              Pancake listing price 50% higher than presale price: 1 BNB = 23,300 SLR Official Token (~0.015$/SLR)
            </p>
          </li>
          <li class="mt-16">
            <span class="text-gray text-11 uppercase">softcap</span>
            <p class="text-14 leading-[27px] text-white mt-2">50 BNB Hardcap: ~6,000 BNB</p>
            <p class="text-14 leading-[27px] text-white">No Contribution Limit ( you can buy any amount you want)</p>
          </li>
          <li class="mt-16">
            <span class="text-gray text-11 uppercase">max duration</span>
            <p class="text-14 leading-[27px] text-white mt-2">
              3 days. If before 3 days hardcap reached we will consider the high demand to open Presale 2 with higher
              price than Presale 1. 40% of the Presale fund will be used for Thunder farming to distribute to THOREUM
              holders, so it is better for the community if we can raise more fund and satisfy high demand.
            </p>
            <p class="text-14 leading-[27px] text-white mt-24">
              Announcement about swapping $SLRPRE to SLR Official Token after presale end: After you bought $SLRPRE,
              just HOLD it until presale end. $SLRPRE (presale token) are locked and cannot be traded/transferred until
              presale end
            </p>
          </li>
        </ul>
      </div>
      <presale-referral-program-widget class="referral-widget flex-shrink-0 mt-[22px]" />
    </div>
    <button
      class="toggle-button w-full text-gray text-11 uppercase h-[44px] bottom-0 backdrop-blur-4"
      type="button"
      style="background: rgba(15, 15, 15, 0.4)"
      @click="() => toggle()"
    >
      <div class="wrapper flex justify-center items-center font-title">
        <span class="text" />
        <ui-icon
          class="arrow ml-6"
          name="arrow-pixel"
          size="8"
        />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { computedEager, useToggle } from '@vueuse/shared'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import PresaleReferralProgramWidget from './PresaleReferralProgramWidget.vue'

  export default defineComponent({
    name: 'presale-details',
    components: { PresaleReferralProgramWidget, UiButton, UiIcon },
    setup() {
      const [isOpen, toggle] = useToggle()
      const classList = computedEager(() => (isOpen.value ? '-open' : '-close'))

      return {
        classList,
        toggle,
      }
    },
  })
</script>

<style scoped>
  .presale-details {
    overflow-anchor: none;
  }

  .presale-details > .wrapper {
    display: flex;
  }

  .presale-details.-open > .wrapper {
    height: auto;
  }
  .presale-details:not(.-open) > .wrapper {
    height: 404px;
  }

  .presale-details > .wrapper > .referral-widget {
    width: 337px;
  }

  .presale-details.-open > .toggle-button {
    @apply mt-24;
  }
  .presale-details:not(.-open) > .toggle-button {
    @apply absolute;
  }

  .presale-details.-open > .toggle-button > .wrapper > .text {
    content: 'hide';
  }
  .presale-details:not(.-open) > .toggle-button > .wrapper > .text {
    content: 'show more';
  }

  .presale-details.-open > .toggle-button > .wrapper > .arrow {
    transform: rotate(180deg);
  }
  .presale-details:not(.-open) > .toggle-button > .wrapper > .arrow {
    transform: rotate(0deg);
  }

  @media only screen and (max-width: 860px) {
    .presale-details > .wrapper {
      display: block;
    }

    .presale-details > .toggle-button {
      display: none;
    }

    .presale-details:not(.-open) > .wrapper {
      height: auto;
    }

    .presale-details > .wrapper > .referral-widget {
      width: auto;
    }
  }
</style>
