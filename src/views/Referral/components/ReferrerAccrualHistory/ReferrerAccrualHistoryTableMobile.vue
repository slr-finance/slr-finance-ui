<template>
  <ui-table
    :columns="['']"
    :data="accrualsList"
    :item-height="133"
    template-columns="1fr"
  >
    <template #row="{ data }">
      <div class="item">
        <div class="row">
          <div class="label">Reason</div>
          <accrual-label
            :action="data.action"
            :label="data.actionLabel"
          />
        </div>
        <div class="row">
          <div class="label">Amount</div>
          <div class="leading-none">{{ data.amountStr }}</div>
        </div>
        <div class="row">
          <div class="label">Address</div>
          <div class="leading-none">{{ data.shortAddress }}</div>
        </div>
        <div class="row">
          <div class="label">Date</div>
          <div class="leading-none">
            {{ data.dateStr }}
            <div class="text-gray text-11 leading-none">
              {{ data.timeStr }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </ui-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiTable from '@/components/ui/UiTable.vue'
  import AccrualLabel from './AccrualLabel.vue'
  import { useReferrerAccrualList } from '../../hooks/useReferrerAccrualList'

  export default defineComponent({
    name: 'referrer-accrual-history-table-mobile',
    setup() {
      const { accrualsList } = useReferrerAccrualList()

      return { accrualsList }
    },
    components: {
      AccrualLabel,
      UiTable,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .item {
    @apply py-12;
  }

  .item > .row {
    @apply flex justify-between items-center h-32;
  }

  .item > .row > .label {
    @apply uppercase text-gray text-11;
  }
</style>
