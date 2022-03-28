<template>
  <div style="max-width: 408px">
    <div class="mb-20 text-18 flex items-center uppercase">
      Referral list
      <div class="w-max bg-yellow text-black flex items-center rounded-16 h-32 px-10 text-14 ml-16">
        {{ numberOfReferrals }}
      </div>
    </div>
    <ui-widget>
      <div
        class="table overflow-auto text-12"
        style="height: 300px"
      >
        <span class="header-item pr-20">#</span>
        <span class="header-item uppercase">address</span>
        <span class="header-item text-right uppercase">date</span>
        <template
          v-for="(item, i) of referralsList"
          :key="item.address"
        >
          <span class="item pr-20 text-gray leading-none">{{ i + 1 }}</span>
          <span class="item pr-20 leading-none">{{ item.shortAddress }}</span>
          <div class="item text-right">
            <div class="leading-none">{{ item.dateStr }}</div>
            <div class="text-gray text-11 leading-none">
              {{ item.timeStr }}
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

  import { useReferrals } from '../hooks/useReferrals'

  export default defineComponent({
    name: 'referrals-list',
    components: {
      UiWidget,
    },
    setup() {
      const { referralsList, isFetching, numberOfReferrals } = useReferrals()

      return {
        isFetching,
        numberOfReferrals,
        referralsList,
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
    grid-template-columns: max-content 1fr max-content;
  }

  .item {
    @apply border-b pt-10 h-full pb-6 border-gray border-opacity-30;
  }

  .header-item {
    @apply sticky bg-black top-0 pb-6 text-gray;
  }
</style>
