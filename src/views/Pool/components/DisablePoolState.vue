<template>
  <div class="ui-box-corners mb-20">
    <ui-placeholder
      :icon="icon"
      :title="title"
      description="Please complete all previous pools"
    >
      <ui-button
        class="w-full"
        size="48"
        variant="accent"
        :to="activePoolLink"
      >
        Go to active pool
      </ui-button>
    </ui-placeholder>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import { useStaker } from '@/store/hooks/useStaker'
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
      const [stakerState] = useStaker()
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
    components: { UiButton, UiPlaceholder },
  })
</script>
