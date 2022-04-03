<template>
  <div>
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
      <ui-button
        variant="pale"
        size="48"
        class="w-full 875:hidden"
        @click="showAllReferrals"
        v-if="isButtonVisible"
      >
        <div class="flex items-center">
          <span>Show accrual history list</span>
          <div class="w-24 h-24 rounded-full border border-white border-opacity-20 flex justify-center items-center ml-10">
            <ui-icon size="14" name="arrow-right" />
          </div>
        </div>
      </ui-button>
    </ui-widget>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, unref } from 'vue'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'

  import { useReferrerAccrualHistory } from '../hooks/useReferrerAccrualHistory'

  const INITIAL_VISIBLE_AMOUNT = 6

  export default defineComponent({
    name: 'referrer-accrual-history',
    components: {
      UiWidget,
      UiButton,
      UiIcon,
    },
    setup() {
      const { accrualList, isFetching } = useReferrerAccrualHistory()

      const visibleItemsAmount = ref(INITIAL_VISIBLE_AMOUNT)

      const accruals = computed(() => unref(accrualList).slice(0, unref(visibleItemsAmount)))

      const isButtonVisible = computed(() => unref(visibleItemsAmount) < unref(accrualList).length)

      const showAllReferrals = () => {
        visibleItemsAmount.value = unref(accrualList).length
      }

      return {
        isFetching,
        accruals,
        isButtonVisible,
        showAllReferrals,
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
