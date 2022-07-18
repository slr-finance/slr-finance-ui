<template>
  <div class="flex flex-col border border-white bg-black rounded-12 py-20">
    <ui-galaxy-loader
      class="m-auto"
      v-if="isFetching"
    />
    <ui-placeholder
      v-else-if="referralsList.length === 0"
      class="inset-0 absolute"
      icon="binocular"
      title="You don't have referrals"
      description="Share link and Get 10% from perfomance fee for any transactions and 1% from any rawards"
    />
    <ui-table
      v-else
      :columns="['#', 'address', 'date']"
      :data="referralsList"
      :item-height="44"
      :is-slicing-rows="isSlicingRows"
      template-columns="44px 1fr max-content"
      class="h-full flex-1"
      @show-all="handleShowAllReferrals"
    >
      <template #row="{ data, index }">
        <span class="item pr-20 text-gray leading-none">{{ index + 1 }}</span>
        <span class="item pr-20 leading-none">{{ data.shortAddress }}</span>
        <div class="item text-right">
          <div class="leading-none">{{ data.dateStr }}</div>
          <div class="text-gray text-11 leading-none">
            {{ data.timeStr }}
          </div>
        </div>
      </template>
    </ui-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiTable from '@/components/ui/UiTable.vue'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import { useReferrals } from '../hooks/useReferrals'

  export default defineComponent({
    name: 'referrals-list',
    props: {
      isSlicingRows: {
        type: Boolean,
      }
    },
    emits: ['showAll'],
    setup(props, { emit }) {
      const handleShowAllReferrals = () => {
        emit('showAll')
      }

      const { referralsList, isFetching, numberOfReferrals } = useReferrals()

      return {
        referralsList,
        isFetching,
        numberOfReferrals,
        handleShowAllReferrals,
      }
    },
    components: {
    UiWidget,
    UiPlaceholder,
    UiTable,
    UiGalaxyLoader
},
  })
</script>
