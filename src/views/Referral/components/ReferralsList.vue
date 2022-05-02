<template>
  <div class="flex flex-col">
    <div class="mb-24 text-ui-page-label flex items-center uppercase relative w-max font-title">
      Referral list
      <div
        class="w-max bg-yellow text-black flex items-center rounded-16 h-32 px-10 text-14 ml-16 absolute -right-36"
        v-if="numberOfReferrals > 0"
      >
        {{ numberOfReferrals }}
      </div>
    </div>
    <ui-widget
      scroll
      class="flex-1"
      style="height: 323px"
    >
      <div class="table h-full relative overflow-auto text-12">
        <span class="header-item pr-20">#</span>
        <span class="header-item uppercase">address</span>
        <span class="header-item text-right uppercase">date</span>
        <template v-if="referrals.length > 0">
          <template
            v-for="(item, i) of referrals"
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
      <ui-button
        variant="gray"
        size="48"
        class="w-full 875:hidden"
        @click="showAllReferrals"
        v-if="isButtonVisible"
      >
        <div class="flex items-center">
          <span>Show full referral list</span>
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

  import { useReferrals } from '../hooks/useReferrals'

  const INITIAL_VISIBLE_AMOUNT = 6

  export default defineComponent({
    name: 'referrals-list',
    components: {
      UiWidget,
      UiButton,
      UiIcon,
      UiPlaceholder,
    },
    setup() {
      const { referralsList, isFetching, numberOfReferrals } = useReferrals()

      const visibleItemsAmount = ref(INITIAL_VISIBLE_AMOUNT)

      const referrals = computed(() => unref(referralsList).slice(0, unref(visibleItemsAmount)))

      const showAllReferrals = () => {
        visibleItemsAmount.value = unref(referralsList).length
      }

      const isButtonVisible = computed(() => unref(visibleItemsAmount) < unref(referralsList).length)

      return {
        isFetching,
        numberOfReferrals,
        referrals,
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
    grid-template-columns: max-content 1fr max-content;
  }

  .item {
    @apply border-b pt-10 h-full pb-6 border-gray border-opacity-30;
  }

  .header-item {
    @apply sticky bg-black top-0 pb-6 text-gray;
  }
</style>
