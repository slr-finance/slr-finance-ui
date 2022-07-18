<template>
  <ui-table
    :columns="['']"
    :data="accrualList"
    :item-height="44"
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
  import { defineComponent, PropType } from 'vue'
  import UiTable from '@/components/ui/UiTable.vue'
  import AccrualLabel from './AccrualLabel.vue'
  import { AccrualInfo, useReferrerAccrualHistory } from '../../hooks/useReferrerAccrualHistory'

  export default defineComponent({
    name: 'referrer-accrual-history-table-mobile',
    props: {
      accruals: {
        type: Array as PropType<AccrualInfo[]>,
        required: true,
      },
      numberOfAccrual: {
        type: Number,
        required: true,
      },
      isFetching: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const { accrualList } = useReferrerAccrualHistory()

      return {
        accrualList,
      }
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
