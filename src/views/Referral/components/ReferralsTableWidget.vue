<template>
  <ui-widget :scroll="isDesktop">
    <div class="h-full flex flex-col relative">
      <div class="absolute inset-0">
        <div class="table flex-1 relative overflow-auto text-12">
          <span
            class="header-item"
            :key="index"
            v-for="(column, index) in columns"
          >
            {{ column }}
          </span>

          <slot />
        </div>

        <ui-button
          variant="gray"
          :size="48"
          class="w-full 875:hidden"
          @click="showAllReferrals"
          v-if="isVisibleShowAllButton"
        >
          <div class="flex items-center">
            <span>Show full list</span>
            <div
              class="w-24 h-24 rounded-full border border-white border-opacity-20 flex justify-center items-center ml-10"
            >
              <ui-async-icon-arrow-right class="w-14 h-14"/>
            </div>
          </div>
        </ui-button>
      </div>
    </div>
  </ui-widget>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import { UiButton, UiAsyncIconArrowRight } from '@slr-finance/uikit'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import { useAppBreakpoints } from '@/hooks/useAppBreakpoints'

  export default defineComponent({
    name: 'referrals-table-widget',
    props: {
      columns: {
        type: Array as PropType<String[]>,
        required: true,
      },
      isVisibleShowAllButton: {
        type: Boolean,
      },
    },
    emits: ['showAll'],
    setup(props, { emit }) {
      const { w875: isDesktop } = useAppBreakpoints()
      const showAllReferrals = () => emit('showAll')

      return {
        isDesktop,
        showAllReferrals,
      }
    },
    components: {
      UiWidget,
      UiButton,
      UiAsyncIconArrowRight,
      UiPlaceholder,
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

  .header-item ~ .header-item {
    @apply ml-20;
  }
</style>
