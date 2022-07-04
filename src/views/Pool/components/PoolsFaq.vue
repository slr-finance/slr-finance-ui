<template>
  <ui-modal
    v-model="isOpen"
    label="Staking FAQ"
    max-width="80%"
  >
    <div class="grid grid-cols-3 gap-ui-page-spacing text-center mb-48">
      <div>
        Buy SLR tokens
        <p class="text-14 text-gray">You can buy SLR tokens on 
          slr.finance/swap
          or
          nomiswap.io
        </p>
        <p class="text-14 text-gray">If you use a nomiswap then don't forget to set the slippage to 15%</p>
      </div>
      <div>
        Stake SLR tokens on first pool
        <p class="text-14 text-gray">Conquer the planets of the solar system one by one. And earn with more and more APY</p>
      </div>
      <div>
        Earn up to 633% fixed APY
        <p class="text-14 text-gray">Gain financial freedom with SLR Staking Pools</p>
      </div>
    </div>
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
  }
})
</script>
