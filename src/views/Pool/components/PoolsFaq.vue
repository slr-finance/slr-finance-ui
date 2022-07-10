<template>
  <ui-modal
    v-model="isOpen"
    label="questions about the universe"
    max-width="80%"
  >
    <div class="grid 1024:grid-cols-3 grid-cols-1 gap-ui-page-spacing relative">
      <div class="absolute w-full h-2 bg-white top-[35px]" />
      <div class="bg-gray-800 rounded-12 pb-[22px] pt-20 relative z-1">
        <div class="flex items-center pl-12">
          <ui-icon name="star-pixel" />
          <div class="h-2 bg-white w-full" />
        </div>
        <div class="px-12 mt-8">
          <span>Buy SLR tokens</span>
          <p class="text-white text-opacity-50 mt-8 text-12">You can buy SLR tokens on 
            slr.finance/swap
            or
            nomiswap.io
            If you use a nomiswap then don't forget to set the slippage to 15%
          </p>
        </div>
      </div>
      <div class="bg-gray-800 rounded-12 pb-[22px] pt-20 relative z-1">
        <div class="flex items-center">
          <div class="w-12 h-2 bg-white" />
          <ui-icon name="star-pixel" />
          <div class="h-2 bg-white w-full" />
        </div>
        <div class="px-12 mt-8">
          <span>Stake SLR tokens on first pool</span>
          <p class="text-12 text-white text-opacity-50 mt-8">Conquer the planets of the solar system one by one. And earn with more and more APY</p>
        </div>
      </div>
      <div class="bg-violet-400 rounded-12 pb-[22px] pt-20 relative z-1">
        <div class="flex items-center">
          <div class="w-12 h-2 bg-white" />
          <div class="rounded-full bg-orange w-32 h-32 flex shrink-0 items-center justify-center">
            <ui-icon name="nlo" :size="20" />
          </div>
        </div>
        <div class="px-12 mt-8">
          <span>Earn up to 633% fixed APY</span>
          <p class="text-12 text-white text-opacity-50 mt-8">Gain financial freedom with SLR Staking Pools</p>
        </div>
      </div>
    </div>
    <h4 class="text-18 text-white font-title mt-24 mb-20"><span class="text-gray">SPACE</span> FAQ</h4>
    <div class="grid grid-cols-2 gap-20">
      <div class="space-y-20">
        <ui-accordion title="What is APY?">
          <p>Annual percentage yield (APY) is a percentage that reflects the amount of tokes, or interest, you earn over one year.</p>
          <p>Any SLR tokens you stake in SLR pools will be automatically harvested and compounded for you every day.</p>
        </ui-accordion>
        <ui-accordion title="Why can't I deposit tokens in any pool?">
          qe
        </ui-accordion>
        <ui-accordion title="What is timelock?">
          qe
        </ui-accordion>
        <ui-accordion title="How to withdraw tokens before the end of the timelock?">
          qe
        </ui-accordion>
      </div>
      <div class="space-y-20">
        <ui-accordion title="Will I get rewards after the end of the timelock?">
          qe
        </ui-accordion>
        <ui-accordion title="How to migrate to the next pool?">
          qe
        </ui-accordion>
        <ui-accordion title="How else can I earn?">
          qe
        </ui-accordion>
      </div>
    </div>

    <any-other-questions
      doc-link=""
      class="mt-64"
    />
  </ui-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiModal from '@/components/ui/UiModal.vue'
import { useToggle } from '@vueuse/shared'
import UiAccordion from '@/components/ui/UiAccordion.vue'
import UiIcon from '@/components/ui/UiIcon'
import AnyOtherQuestions from '@/components/AnyOtherQuestions.vue'

export default defineComponent({
  setup() {
    const [isOpen, toggle] = useToggle()

    toggle(true)

    return { isOpen }
  },

  components: {
    UiModal,
    UiAccordion,
    AnyOtherQuestions,
    UiIcon
  }
})
</script>
