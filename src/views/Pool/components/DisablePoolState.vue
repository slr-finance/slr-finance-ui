<template>
  <ui-box-corners class="mb-20 p-12">
    <ui-placeholder
      :icon="icon"
      :title="title"
      icon-prefix="ui-icon-pools"
      description="Please complete all previous pools"
    >
      <ui-button
        class="w-full"
        :size="48"
        variant="violet"
        :to="activePoolLink"
      >
        Go to active pool
      </ui-button>
    </ui-placeholder>
  </ui-box-corners>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { UiButton, UiBoxCorners } from '@slr-finance/uikit'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import { useStakerState } from '../hooks/useStakerState'
  import { usePoolInfo } from '../hooks/usePoolInfo'

  export default defineComponent({
    name: 'disable-pool-state',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const poolInfo = usePoolInfo(toRef(props, 'poolId'))
      const { stakerState } = useStakerState()
      const stakerPoolId = computed(() => {
        const { poolId } = stakerState.value

        return poolId ? poolId : 1
      })
      const stakerPool = usePoolInfo(stakerPoolId)
      const title = computed(() => `The ${poolInfo.value.name} pool is not open for you`)
      const icon = computed(() => poolInfo.value.page.icon)
      const activePoolLink = computed(() => {
        return {
          name: stakerPool.value.routeName,
        }
      })

      return { activePoolLink, icon, title }
    },
    components: { UiButton, UiPlaceholder, UiBoxCorners },
  })
</script>
