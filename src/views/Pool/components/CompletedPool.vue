<template>
  <div>
    <p>Вы тут закончили фармить</p>
    <p>Нафармленно n SOLAR>FINANCE за k дней</p>
    <ui-button :to="i18nRouteHelper({ name: stakerPool.routeName })">
      Go to active pool
      <ui-icon
        name="arrow-right"
        class="ml-8"
      />
    </ui-button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import { useStaker } from '@/store/hooks/useStaker'
  import { usePoolInfo } from '../hooks/usePoolInfo'

  export default defineComponent({
    name: 'completed-pool',
    setup(props) {
      const [stakerState] = useStaker()
      const poolId = computed(() => stakerState.value.poolId)
      const stakerPool = usePoolInfo(poolId)

      return { stakerPool }
    },
    components: { UiButton },
  })
</script>
