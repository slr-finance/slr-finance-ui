<template>
  <div
    class="presale-details bg-gray-300 bg-opacity-80 rounded-12 overflow-hidden relative w-full"
    :class="classList"
  >
    <div class="wrapper px-ui-page-inner-spacing pt-24 pb-16">
      <presale-referral-program-widget class="referral-widget flex-shrink-0 mb-12" />
      <div class="content mb-12">
        <h4 class="font-title text-11 text-violet uppercase">information details</h4>
        <h3 class="font-title text-28 text-white uppercase mt-8">presale details</h3>
        <ul class="mt-24">
          <li>
            <span class="text-gray text-11 uppercase">listing</span>
            <p class="text-14 leading-192 text-white mt-2">
              Pancake listing price 15% higher than presale price: 1 BNB = {{bnbPriceInSlrStr}} Official Token (~{{slrPriceInUsdStr}}/SLR)
            </p>
          </li>
          <li class="mt-16">
            <span class="text-gray text-11 uppercase">softcap</span>
            <p class="text-14 leading-192 text-white mt-2">50 BNB Hardcap: ~{{ hardCapStr }}</p>
            <p class="text-14 leading-192 text-white">No Contribution Limit ( you can buy any amount you want)</p>
          </li>
          <li class="mt-16">
            <span class="text-gray text-11 uppercase">max duration</span>
            <p class="text-14 leading-192 text-white mt-2">
              3 days. If before 3 days hardcap reached we will consider the high demand to open Presale 2 with higher
              price than Presale 1. 40% of the Presale fund will be used for Thunder farming to distribute to THOREUM
              holders, so it is better for the community if we can raise more fund and satisfy high demand.
            </p>
            <p class="text-14 leading-192 text-white mt-24">
              Announcement about swapping $SLRPRE to SLR Official Token after presale end: After you bought $SLRPRE,
              just HOLD it until presale end. $SLRPRE (presale token) are locked and cannot be traded/transferred until
              presale end
            </p>
          </li>
        </ul>
      </div>
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
  import { computed, defineComponent } from 'vue'
  import { computedEager, useToggle } from '@vueuse/shared'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import PresaleReferralProgramWidget from './PresaleReferralProgramWidget.vue'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { usePresale } from '../hooks/usePresale'
  import { BIG_ONE, BIG_ZERO } from '@/utils/bigNumber'

  export default defineComponent({
    name: 'presale-details',
    components: { PresaleReferralProgramWidget, UiButton, UiIcon },
    setup() {
      const { phasesMaxAmount, prices, launchingPrice } = usePresale()
      const [isOpen, toggle] = useToggle()
      const classList = computedEager(() => (isOpen.value ? '-open' : '-close'))

      const hardCap = computed(() => {
        const pricesVal = prices.value

        return phasesMaxAmount.value.reduce((acc, item, index) => acc.plus(item.times(pricesVal[index])), BIG_ZERO)
      })
      const hardCapStr = useTokenAmountFormat(hardCap, 'BNB')

      const bnbPriceInSlr = computed(() => BIG_ONE.div(launchingPrice.value))
      const bnbPriceInSlrStr = useTokenAmountFormat(bnbPriceInSlr, 'SLR')
      const slrPriceInUsd = computed(() => launchingPrice.value.times(400))
      const slrPriceInUsdStr = useTokenAmountFormat(slrPriceInUsd, '$')

      return {
        classList,
        toggle,
        hardCapStr,
        bnbPriceInSlrStr,
        slrPriceInUsdStr,
      }
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .presale-details {
    overflow-anchor: none;
  }

  .presale-details.-open > .wrapper {
    height: auto;
  }
  .presale-details:not(.-open) > .wrapper {
    height: 404px;
  }

  .presale-details > .wrapper > .referral-widget {
    width: 337px;
    float: right;
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
      @apply flex flex-col-reverse;
    }

    .presale-details > .toggle-button {
      display: none;
    }

    .presale-details:not(.-open) > .wrapper {
      height: auto;
    }

    .presale-details > .wrapper > .referral-widget {
      width: auto;
      float: none;
    }
  }
</style>
