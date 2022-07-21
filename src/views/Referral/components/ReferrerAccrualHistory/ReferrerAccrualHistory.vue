<template>
  <div class="flex flex-col border border-white bg-black rounded-12 py-20">
    <ui-galaxy-loader
      class="m-auto"
      v-if="isFetching"
    />

    <ui-placeholder
      v-else-if="numberOfAccruals === 0"
      class="m-auto p-16"
      icon="binocular"
      title="You don't have referrals"
      description="Share link and Get 10% from perfomance fee for any transactions and 1% from any rawards"
    />

    <referrer-accrual-history-table
      v-else-if="isDesktop"
      class="h-full"
    />

    <referrer-accrual-history-table-mobile
      v-else
      class="h-full"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useBreakpoints } from '@vueuse/core'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import ReferrerAccrualHistoryTableAsync from './ReferrerAccrualHistoryTableAsync'
  import ReferrerAccrualHistoryTableMobileAsync from './ReferrerAccrualHistoryTableMobileAsync'

  import { useReferrerAccrualList } from '../../hooks/useReferrerAccrualList'

  export default defineComponent({
    name: 'referrer-accrual-history',
    components: {
      ReferrerAccrualHistoryTable: ReferrerAccrualHistoryTableAsync,
      ReferrerAccrualHistoryTableMobile: ReferrerAccrualHistoryTableMobileAsync,
      UiPlaceholder,
      UiGalaxyLoader,
    },
    setup() {
      const { isDesktop } = useBreakpoints({ isDesktop: 875 })
      const { isFetching, numberOfAccruals } = useReferrerAccrualList()

      return {
        isFetching,
        numberOfAccruals,
        isDesktop,
      }
    },
  })
</script>
