<template>
  <div class="table text-12 relative">
    <span class="header-item pr-20 uppercase">Amount</span>
    <span class="header-item pr-20 uppercase">Address</span>
    <span class="header-item pr-20 text-right uppercase">Date</span>
    <span class="header-item text-right uppercase">Reason</span>
    <template v-if="accruals.length > 0">
      <template
        v-for="item of accruals"
        :key="item.address"
      >
        <span class="item pr-20 leading-none">{{ item.amountStr }}</span>
        <span class="item pr-20 leading-none">{{ item.shortAddress }}</span>
        <div class="item pr-20 text-right leading-none">
          <div>{{ item.dateStr }}</div>
          <div class="text-gray text-11 leading-none">
            {{ item.timeStr }}
          </div>
        </div>
        <div class="item">
          <accrual-label
            :action="item.action"
            :label="item.actionLabel"
          />
        </div>
      </template>
    </template>

    <ui-placeholder
      v-else
      class="inset-0 absolute"
      icon="binocular"
      title="You don't have referrals"
    >
      <p class="text-center leading-[20px] text-gray">
        Share link and Get 10% from perfomance fee for any transactions and 1% from any rawards
      </p>
    </ui-placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import AccrualLabel from './AccrualLabel.vue'
  import { AccrualInfo } from '../../hooks/useReferrerAccrualHistory'

  export default defineComponent({
    name: 'referrer-accrual-history-table',
    props: {
      accruals: {
        type: Array as PropType<AccrualInfo[]>,
        required: true,
      },
      isFetching: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      UiPlaceholder,
      AccrualLabel,
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
