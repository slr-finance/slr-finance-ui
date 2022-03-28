<template>
  <div style="max-width: 408px">
    <div class="mb-24 text-18 uppercase">Accrual history</div>
    <ui-widget>
      <div
        class="table grid-cols-4 overflow-auto text-12"
        style="height: 300px"
      >
        <span class="header-item pr-20 uppercase">amount</span>
        <span class="header-item pr-20 uppercase">amount</span>
        <span class="header-item pr-20 text-right uppercase">date</span>
        <span class="header-item text-right uppercase">reason</span>
        <template
          v-for="item of accrualList"
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
            <div
              class="bg-opacity-20 px-6 rounded-18 text-center min-h-24"
              :class="{
                'text-yellow bg-yellow': item.action === 1,
                'text-aqua bg-aqua': item.action === 2,
                // 'text-pink bg-pink': true,
              }"
            >
              <span class="align-text-top">
                {{ item.actionLabel }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </ui-widget>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiWidget from '@/components/ui/UiWidget.vue'

  import { useReferrerAccrualHistory } from '../hooks/useReferrerAccrualHistory'

  export default defineComponent({
    name: 'referrer-accrual-history',
    components: {
      UiWidget,
    },
    setup() {
      const { accrualList, isFetching } = useReferrerAccrualHistory()

      return {
        isFetching,
        accrualList,
      }
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
  }

  .header-item {
    @apply sticky bg-black top-0 pb-6 text-gray;
  }

  .item {
    @apply border-b pt-10 border-gray border-opacity-30 h-full;
  }
</style>
