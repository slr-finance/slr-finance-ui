<template>
  <div>
    <div>Referral List ({{ referralsList.length }} / {{ numberOfReferrals }}; isFetching = {{ isFetching }})</div>

    <div>
      <div
        v-for="referal in referralsList"
        :key="referal.address"
      >
        {{ referal.address }} {{ referal.dateStr }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useReferrals } from '../hooks/useReferrals'

  export default defineComponent({
    name: 'referrals-list',
    setup() {
      const { referralsList, isFetching, numberOfReferrals } = useReferrals()

      return { referralsList, isFetching, numberOfReferrals }
    },
  })
</script>
