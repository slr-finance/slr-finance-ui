<template>
  <div>
    <div class="mb-24 text-18 uppercase font-title">Accrual history</div>
    <ui-widget>
      <div
        class="table overflow-auto text-12 relative"
        style="height: 300px"
      >
        <span class="header-item pr-20 uppercase">amount</span>
        <span class="header-item pr-20 uppercase">amount</span>
        <span class="header-item pr-20 text-right uppercase">date</span>
        <span class="header-item text-right uppercase">reason</span>
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
              <div
                class="bg-opacity-20 flex items-center w-max px-6 rounded-18 text-center h-18 text-12 ml-auto"
                :class="{
                  'text-aqua bg-aqua': item.action === REFERRALS_ACTIONS.Presale,
                  'text-pink bg-pink': item.action === REFERRALS_ACTIONS.Staking,
                  'text-yellow bg-yellow': item.action === REFERRALS_ACTIONS.Transfer,
                  'text-red bg-red': item.action === REFERRALS_ACTIONS.Sell,
                  'text-green-original bg-green-original': item.action === REFERRALS_ACTIONS.Buy,
                }"
              >
                <span>
                  {{ item.actionLabel }}
                </span>
              </div>
            </div>
          </template>
        </template>
        <div class="w-full h-full flex items-center justify-center absolute" v-else>
          <ui-placeholder
            class="w-full"
            icon="binocular"
            title="You don't have referrals"
          >
            <p class="text-center leading-[20px] text-gray">Share link and Get 10% from perfomance fee for any transactions and 1% from any rawards</p>
          </ui-placeholder>
        </div>
      </div>
      <ui-button
        variant="gray-800"
        size="48"
        class="w-full 875:hidden"
        @click="showAllReferrals"
        v-if="isButtonVisible"
      >
        <div class="flex items-center">
          <span>Show accrual history list</span>
          <div
            class="w-24 h-24 rounded-full border border-white border-opacity-20 flex justify-center items-center ml-10"
          >
            <ui-icon
              size="14"
              name="arrow-right"
            />
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
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import { REFERRALS_ACTIONS } from '@/config/constants/referrals'

  import { useReferrerAccrualHistory } from '../hooks/useReferrerAccrualHistory'

  const INITIAL_VISIBLE_AMOUNT = 6

  export default defineComponent({
    name: 'referrer-accrual-history',
    components: {
      UiWidget,
      UiButton,
      UiIcon,
      UiPlaceholder,
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
        REFERRALS_ACTIONS,
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
    grid-template-columns: 1fr 1fr 1fr max-content;
  }

  .header-item {
    @apply sticky bg-black top-0 pb-6 text-gray;
  }

  .item {
    @apply border-b pt-10 border-gray border-opacity-30 h-full;
  }
</style>
