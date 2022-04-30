<template>
  <div class="text-12 relative">
    <template v-if="accrualsPreview.length > 0">
      <ul class="divide-y divide-gray">
        <li
          class="item"
          v-for="item of accrualsPreview"
          :key="item.address"
        >
          <div class="row">
            <div class="label">Reason</div>
            <accrual-label
              :action="item.action"
              :label="item.actionLabel"
            />
          </div>
          <div class="row">
            <div class="label">Amount</div>
            <div class="leading-none">{{ item.amountStr }}</div>
          </div>
          <div class="row">
            <div class="label">Address</div>
            <div class="leading-none">{{ item.shortAddress }}</div>
          </div>
          <div class="row">
            <div class="label">Date</div>
            <div class="leading-none">
              {{ item.dateStr }}
              <div class="text-gray text-11 leading-none">
                {{ item.timeStr }}
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ui-button
        v-if="isShownMoreButton"
        variant="gray"
        size="48"
        class="w-full"
      >
        <div class="flex items-center">
          <span>Show accrual history list</span>
          <div
            class="w-24 h-24 rounded-full border border-white border-opacity-20 flex justify-center items-center ml-10"
          >
            <ui-icon
              size="9"
              name="arrow-pixel"
              rotate="-90"
            />
          </div>
        </div>
      </ui-button>
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
  import { computed, defineComponent, PropType } from 'vue'
  import AccrualLabel from './AccrualLabel.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import { AccrualInfo } from '../../hooks/useReferrerAccrualHistory'

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
      const accrualsPreview = computed(() => (props.numberOfAccrual > 3 ? props.accruals.slice(0, 3) : props.accruals))
      const isShownMoreButton = computed(() => props.numberOfAccrual > 3)

      return {
        accrualsPreview,
        isShownMoreButton,
      }
    },
    components: {
      UiIcon,
      UiButton,
      UiPlaceholder,
      AccrualLabel,
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
