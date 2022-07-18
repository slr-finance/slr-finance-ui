<template>
  <div
    class="ui-table flex flex-col"
    ref="root"
  >
    <div class="header">
      <div
        class="item"
        v-for="(col, index) in columns"
        :key="index"
      >
        {{ col }}
      </div>
    </div>

    <div
      class="flex-1 relative ui-scrollbar"
      v-bind="containerProps"
    >
      <div
        v-bind="wrapperProps"
        class="absolute inset-0 rows-wrapper"

      >
        <div
          v-for="{ data, index } in list"
          :key="index"
          :style="{height: `${itemHeight}px`}"
          class="row"
        >
          <slot name="row"
            :data="data"
            :index="index"
          />
        </div>
      </div>
    </div>

    <div v-if="isSliced">
      <ui-button
        variant="gray"
        size="48"
        class="w-full 875:hidden"
        @click="$emit('showAll')"
      >
        <div class="flex items-center">
          <span>Show full list</span>
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
    </div>
  </div>
</template>

<script lang="ts">
import { computed, watch, PropType, defineComponent } from 'vue'
import { templateRef, useVirtualList } from '@vueuse/core'
import UiButton from './UiButton.vue'
import UiIcon from './UiIcon/UiIcon.vue'

export default defineComponent({
  components: { UiButton, UiIcon },
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
      required: true
    },
    itemHeight: {
      type: Number,
      required: true,
    },
    isSlicingRows: {
      type: Boolean,
    }
  },
  emits: ['showAll'],
  setup(props) {
    const maxItems = computed(() => props.isSlicingRows ? 4 : -1)
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
      itemHeight: () => props.itemHeight
    })

    const root = templateRef('root')

    watch(
      [() => props.templateColumns, root],
      ([templateColumns, rootEl]) => {
        if (rootEl) {
          rootEl.style.setProperty('--ui-table-grid-template-columns', templateColumns.trim())
          console.log(1, rootEl.style.getPropertyValue('--ui-table-grid-template-columns'), templateColumns)
        }
      },
      { immediate: true }
    )

    return {
      list,
      containerProps,
      wrapperProps,
      isSliced,
    }
  }
})
</script>

<style lang="postcss" scoped>
.ui-table > .header,
.rows-wrapper > .row {
  @apply grid;
  grid-template-columns: var(--ui-table-grid-template-columns);
}

.rows-wrapper > .row {
  @apply pl-8 pr-4;
}

.ui-table > .header {
  @apply pl-8 pr-12;
}
</style>