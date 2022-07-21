<template>
  <ui-table
    :columns="['Amount', 'Address', 'Date', 'Reason']"
    :data="accrualsList"
    :item-height="44"
    template-columns="1fr 1fr 1fr max-content"
  >
    <template #row="{ data }">
      <span class="item leading-none">{{ data.amountStr }}</span>
      <span class="item leading-none">{{ data.shortAddress }}</span>
      <div class="item text-right leading-none">
        <div>{{ data.dateStr }}</div>
        <div class="text-gray text-11 leading-none">
          {{ data.timeStr }}
        </div>
      </div>
      <div class="item">
        <accrual-label
          :action="data.action"
          :label="data.actionLabel"
        />
      </div>
    </template>
  </ui-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import UiTable from '@/components/ui/UiTable.vue'
  import AccrualLabel from './AccrualLabel.vue'
  import { useReferrerAccrualList } from '../../hooks/useReferrerAccrualList'

  export default defineComponent({
    name: 'referrer-accrual-history-table',
    components: {
      UiPlaceholder,
      AccrualLabel,
      UiTable,
    },

    setup() {
      const { accrualsList } = useReferrerAccrualList()

      return { accrualsList }
    },
  })
</script>

<style
  scoped
  lang="postcss"
>
  .table {
    @apply grid items-end;
    grid-auto-rows: 44px;
    grid-template-rows: 23px;
    grid-template-columns: 1fr 1fr 1fr max-content;
  }

  .header-item {
    @apply sticky bg-black top-0 pb-6 text-gray;
  }

  .item {
    @apply border-b pt-10 border-gray border-opacity-30 h-full;
  }
</style>
