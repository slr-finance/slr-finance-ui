<template>
  <referral-widget-title
    title="Referral list"
    :counter="numberOfReferrals"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useReferralsList } from '../hooks/useReferralsList'
  import ReferralWidgetTitle from './ReferralWidgetTitle.vue'

  export default defineComponent({
    name: 'referral-list-title',
    components: { ReferralWidgetTitle },
    setup() {
      const { numberOfReferrals } = useReferralsList()

      return { numberOfReferrals }
    },
  })
</script>
