<template>
  <div class="flex flex-col">
    <div class="mb-24 text-ui-page-label uppercase font-title">Accrual history</div>
    <ui-widget
      :scroll="isDesktop"
      class="flex-1"
      style="height: 323px"
    >
      <referrer-accrual-history-table
        v-if="isDesktop"
        class="h-full"
        :accruals="accrualList"
        :is-fetching="isFetching"
      />

      <referrer-accrual-history-table-mobile
        v-else
        class="h-full"
        :accruals="accrualList"
        :number-of-accrual="numberOfAccrual"
        :is-fetching="isFetching"
      />
    </ui-widget>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useBreakpoints } from '@vueuse/core'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import ReferrerAccrualHistoryTableAsync from './ReferrerAccrualHistoryTableAsync'
  import ReferrerAccrualHistoryTableMobileAsync from './ReferrerAccrualHistoryTableMobileAsync'

  import { useReferrerAccrualHistory } from '../../hooks/useReferrerAccrualHistory'

  export default defineComponent({
    name: 'referrer-accrual-history',
    components: {
      UiWidget,
      ReferrerAccrualHistoryTable: ReferrerAccrualHistoryTableAsync,
      ReferrerAccrualHistoryTableMobile: ReferrerAccrualHistoryTableMobileAsync,
    },
    setup() {
      const { isDesktop } = useBreakpoints({ isDesktop: 875 })
      const { accrualList, isFetching, numberOfAccrual } = useReferrerAccrualHistory()

      return {
        isFetching,
        numberOfAccrual,
        accrualList,
        isDesktop,
      }
    },
  })
</script>
