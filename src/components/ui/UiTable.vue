<template>
  <div
    class="ui-table flex flex-col relative"
    ref="root"
  >
    <div class="header text-12 uppercase text-gray-600 relative px-16">
      <div
        class="item"
        v-for="(col, index) in columns"
        :key="index"
      >
        {{ col }}
      </div>
    </div>

    <div
      class="relative flex-1 ui-scrollbar mr-4"
      :ref="containerProps.ref"
      @scroll="containerProps.onScroll"
    >
      <div
        v-bind="wrapperProps"
        class="absolute inset-0 pt-8 rows-wrapper divide-y divide-gray pl-16 pr-4"
      >
        <div
          v-for="{ data, index } in list"
          :key="index"
          :style="{ height: `${itemHeight}px` }"
          class="row pt-10"
        >
          <slot
            name="row"
            :data="data"
            :index="index"
          />
        </div>
      </div>
    </div>

    <div
      class="relative z-10 pl-8 pr-8"
      v-if="isSliced"
    >
      <ui-button
        variant="gray"
        :size="48"
        class="w-full 875:hidden"
        @click="$emit('showAll')"
      >
        <div class="flex items-center">
          <span>Show full list</span>
          <div
            class="w-24 h-24 rounded-full border border-white border-opacity-20 flex justify-center items-center ml-10"
          >
            <ui-async-icon-arrow-right class="h-14 w-14" />
          </div>
        </div>
      </ui-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, watch, PropType, defineComponent } from 'vue'
  import { templateRef, useVirtualList } from '@vueuse/core'
  import { UiButton, UiAsyncIconArrowRight } from '@slr-finance/uikit'

  export default defineComponent({
    components: { UiButton, UiAsyncIconArrowRight },
    props: {
      columns: {
        type: Array as PropType<String[]>,
        required: true,
      },
      data: {
        type: Array as PropType<any[]>,
        required: true,
      },
      templateColumns: {
        type: String,
        required: true,
      },
      itemHeight: {
        type: Number,
        required: true,
      },
      isSlicingRows: {
        type: Boolean,
      },
    },
    emits: ['showAll'],
    setup(props) {
      const maxItems = computed(() => (props.isSlicingRows ? 4 : -1))
      const isSliced = computed(() => {
        const maxItemsVal = maxItems.value

        return maxItemsVal > 0 && maxItems.value < props.data.length
      })
      const slicedData = computed(() => {
        const maxItemsVal = maxItems.value

        if (maxItemsVal > 0) {
          return props.data.slice(0, maxItemsVal)
        }

        return props.data
      })

      const { list, containerProps, wrapperProps } = useVirtualList(slicedData, {
        itemHeight: () => props.itemHeight,
      })

      const root = templateRef('root')

      watch(
        [() => props.templateColumns, root],
        ([templateColumns, rootEl]) => {
          if (rootEl) {
            rootEl.style.setProperty('--ui-table-grid-template-columns', templateColumns.trim())
          }
        },
        { immediate: true },
      )

      return {
        list,
        containerProps,
        wrapperProps,
        isSliced,
      }
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .ui-table > .header,
  .rows-wrapper > .row {
    @apply grid;
    grid-template-columns: var(--ui-table-grid-template-columns);
  }

  .ui-table::after,
  .ui-table > .header::after {
    @apply content-[''] 
    block 
    absolute 
    h-8 
    bg-gradient-to-b 
    left-0 
    z-1;

    width: calc(100% - 12px);
  }

  .ui-table::after {
    @apply bottom-0 from-transparent to-black;
  }

  .ui-table > .header::after {
    @apply top-full from-black to-transparent;
  }
</style>
