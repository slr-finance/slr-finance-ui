<template>
  <div class="relative">
    <ui-poligon
      class="absolute top-0 right-0 transform-gpu 600:translate-x-1/2 translate-x-ui-page-spacing -translate-y-1/2 z-20"
      variant="yellow"
      animated
    >
      Ended
    </ui-poligon>

    <div class="ui-box-corners">
      <ui-placeholder
        icon="finish"
        title="Staking completed"
      >
        <template #description>
          <p>
            Earned
            <span class="text-white">{{ ernedStr }}</span>
            for
            <span class="text-white">{{ daysStr }} days</span>
          </p>
        </template>

        <ui-button
          size="48"
          class="w-full"
          variant="violet"
          :to="{ name: stakerPool.routeName }"
        >
          Go to active pool
        </ui-button>
      </ui-placeholder>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'

  import { useStaker } from '@/store/hooks/useStaker'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { BIG_ZERO } from '@/utils/bigNumber'

  export default defineComponent({
    name: 'completed-pool',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const [stakerState] = useStaker()
      const poolId = computed(() => stakerState.value.poolId)
      const stakerPool = usePoolInfo(poolId)
      const history = computed(() => {
        const poolIdVal = props.poolId

        return stakerState.value.history.find((item) => item.poolId === poolIdVal)
      })
      const erned = computed(() => history.value?.earned ?? BIG_ZERO)
      const daysStr = computed(() => Math.ceil((history.value?.lock ?? 0) / (60 * 60 * 24)).toString())
      const ernedStr = useTokenAmountFormat(erned, 'SLR')

      return { stakerPool, ernedStr, history, daysStr }
    },
    components: { UiButton, UiPlaceholder, UiPoligon },
  })
</script>
