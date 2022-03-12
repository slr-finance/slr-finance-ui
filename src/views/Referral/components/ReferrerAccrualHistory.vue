<template>
  <section>
    <div>Accrued rewards ({{ accrualList.length }} / {{ numberOfAccrual }}; isFetching = {{ isFetching }})</div>

    <div>
      <div
        v-for="accrual in accrualList"
        :key="accrual.address"
      >
        {{ accrual.amountStr }} {{ accrual.shortAddress }} {{ accrual.dateStr }} {{ accrual.actionLabel }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useReferrerAccrualHistory } from '../hooks/useReferrerAccrualHistory'

  export default defineComponent({
    name: 'referrer-accrual-history',
    setup() {
      const { accrualList, isFetching, numberOfAccrual } = useReferrerAccrualHistory()

      return { accrualList, isFetching, numberOfAccrual }
    },
  })
</script>
