<template>
  <div
    class="presale-details bg-gray-300 bg-opacity-80 rounded-12 overflow-hidden relative w-full"
    :class="classList"
  >
    <div class="wrapper px-ui-page-inner-spacing pt-24 pb-16">
      <presale-referral-program-widget class="referral-widget flex-shrink-0 mb-12" />
      <div class="content mb-12 text-14 leading-192 text-white">
        <h4 class="font-title text-11 text-violet uppercase">information details</h4>
        <h3 class="font-title text-28 text-white uppercase mt-8 mb-20">presale details</h3>

        <ul class="space-y-12">
          <li>
            <p>
              Held directly on
              <router-link
                class="ui-link"
                :to="{ name: 'presale' }"
              >
                https://app.slr.finance/presale </router-link
              >, to participate: Connect your wallet, enter the amount of BNB you wish to send and click buy. SLR
              presale tokens (PresaleSLR) will be instantly returned via our presale contract. Do not use exchange
              accounts or don't sent BNB directly presale contract.
            </p>
            <p>
              After you bought SLR presale tokens (PresaleSLR), just hold it until presale end. SLR presale tokens
              (PresaleSLR) are locked and cannot be traded/transferred.
            </p>
            <p>
              SLR presale tokens (PresaleSLR) will be swapped to SLR (Official Token) after presale end ({{
                phasesTimeData[3]
              }}) at
              <router-link
                class="ui-link"
                :to="{ name: 'presale' }"
              >
                https://app.slr.finance/presale
              </router-link>
              with 1:1 ratio and without performance fee.
            </p>
          </li>
          <li>
            <p class="title">Presale phases</p>
            <p>Presale will be open in 3 days, start date: {{ phasesTimeData[0] }} - {{ phasesTimeData[3] }}.</p>
            <p>No Contribution Limit (you can buy any amount you want).</p>

            <ul class="ml-12 space-y-4">
              <li>
                <p class="title">Phase 0:</p>
                <p>
                  Taking part in whitelisted pre-sale makes investors part of a privileged group of individuals who are
                  buying tokens before anyone else.
                </p>
                <p>Whitelist open until {{ phasesTimeData[0] }}.</p>
              </li>
              <li
                v-for="(phasePricesData, index) in phasesPricesData"
                :key="index"
              >
                <p class="title">Phase {{ index + 1 }}:</p>
                <p>1 BNB = {{ phasePricesData.bnbPriceInSlrStr }} (~{{ phasePricesData.slrPriceInUsdStr }}/SLR)</p>
                <p>
                  Maximum will be sold: {{ phasePricesData.maxWillBeSoldStr }}
                  {{ phasePricesData.maxWillBeSoldInBnbStr }}
                </p>
                <p>Start: {{ phasesTimeData[index] }}</p>
                <p>End: {{ phasesTimeData[index + 1] }}</p>
              </li>
              <li>
                <p class="title">Phase 4:</p>
                <p>
                  Pancake listing and opening swap SLR presale tokens (PresaleSLR) to SLR (Official Token) at
                  <router-link
                    class="ui-link"
                    :to="{ name: 'presale' }"
                  >
                    https://app.slr.finance/presale
                  </router-link>
                  with 1:1 ratio and without performance fee.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p class="title">Listing</p>
            <p>
              Pancake listing price {{ phaseDiscountStr }} higher than presale price: 1 BNB =
              {{ bnbPriceInSlrStr }} (~{{ slrPriceInUsdStr }}/SLR)
            </p>
            <p>
              After presale, we will create Pancake liquidity of SLR Official Token. Liquidity will be created and
              locked forever. Evidence will be announced on Telegram & Twitter right after Presale ends and liquidity
              created.
            </p>
          </li>
        </ul>
        <p class="mt-24">
          Want to learn more:
          <ui-external-link href="https://docs.slr.finance/fundamentals/presale"> Documentation </ui-external-link>
        </p>
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
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { tokenAmountFormat } from '@/utils/strFormat/tokenAmountFormat'
  import { usdFormat } from '@/utils/strFormat/usdFormat'
  import UiExternalLink from '@/components/ui/UiExternalLink.vue'

  export default defineComponent({
    name: 'presale-details',
    components: { PresaleReferralProgramWidget, UiButton, UiIcon, UiExternalLink },
    setup() {
      const { phasesMaxAmount, prices, launchingPrice, phasesDiscounts, phasesTime } = usePresale()
      const [isOpen, toggle] = useToggle()
      const classList = computedEager(() => (isOpen.value ? '-open' : '-close'))

      const bnbPriceInUsd = 400

      const bnbPriceInSlr = computed(() => BIG_ONE.div(launchingPrice.value))
      const bnbPriceInSlrStr = useTokenAmountFormat(bnbPriceInSlr, 'SLR Official Token')
      const slrPriceInUsd = computed(() => launchingPrice.value.times(bnbPriceInUsd))
      const slrPriceInUsdStr = useTokenAmountFormat(slrPriceInUsd, '$')
      const phaseDiscount = computed(() => phasesDiscounts.value[0])
      const phaseDiscountStr = usePercentFormat(phaseDiscount)
      const phasesPricesData = computed(() => {
        const phasesMaxAmountVal = phasesMaxAmount.value

        return prices.value.map((phasePrice, index) => {
          return {
            bnbPriceInSlrStr: tokenAmountFormat(BIG_ONE.div(phasePrice), 'SLR Official Token'),
            slrPriceInUsdStr: usdFormat(phasePrice.times(bnbPriceInUsd)),
            maxWillBeSoldStr: index < 2 ? tokenAmountFormat(phasesMaxAmountVal[index], 'PresaleSLR') : 'unlimit',
            maxWillBeSoldInBnbStr:
              index < 2 ? `(${tokenAmountFormat(phasesMaxAmountVal[index].times(phasePrice), 'BNB')})` : '',
          }
        })
      })
      const phasesTimeData = computed(() =>
        phasesTime.value.map((time) =>
          new Date(time * 1000).toLocaleTimeString('en-En', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short',
          }),
        ),
      )

      return {
        classList,
        toggle,
        bnbPriceInSlrStr,
        slrPriceInUsdStr,
        phaseDiscountStr,
        phasesPricesData,
        phasesTimeData,
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

  .presale-details > .wrapper > .content .title {
    @apply text-gray text-11 uppercase;
  }

  .presale-details > .wrapper > .referral-widget {
    margin-left: 16px;
    width: 338px;
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
      margin-left: 0;
      width: auto;
      float: none;
    }
  }
</style>
