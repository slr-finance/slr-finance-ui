<template>
  <ui-modal
    v-model="isOpen"
    label="Staking FAQ"
    max-width="900px"
  >
    <pools-faq-steps />
    <div class="grid grid-cols-1 875:grid-cols-2 gap-20">
      <div class="space-y-20">
        <ui-accordion title="What is APY?">
          <p>
            Annual percentage yield (APY) is a percentage that reflects the amount of tokes, or interest, you earn over
            one year.
          </p>
          <p>Any SLR tokens you stake in SLR pools will be automatically harvested and compounded for you every day.</p>
        </ui-accordion>
        <ui-accordion title="Why can't I deposit tokens in any pool?"> qe </ui-accordion>
        <ui-accordion title="What is timelock?"> qe </ui-accordion>
        <ui-accordion title="How to withdraw tokens before the end of the timelock?"> qe </ui-accordion>
      </div>
      <div class="space-y-20">
        <ui-accordion title="Will I get rewards after the end of the timelock?"> qe </ui-accordion>
        <ui-accordion title="How to migrate to the next pool?"> qe </ui-accordion>
        <ui-accordion title="How else can I earn?"> qe </ui-accordion>
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
  import { UiAccordion, UiModal } from '@slr-finance/uikit'
  import AnyOtherQuestions from '@/components/AnyOtherQuestions.vue'
  import PoolsFaqSteps from './PoolsFaqSteps.vue'
  import { usePoolsFaqModal } from './hooks/usePoolsFaqModal'

  export default defineComponent({
    name: 'pools-faq-modal',
    setup() {
      const [isOpen] = usePoolsFaqModal()

      return { isOpen }
    },

    components: {
      UiModal,
      UiAccordion,
      AnyOtherQuestions,
      PoolsFaqSteps,
    },
  })
</script>
