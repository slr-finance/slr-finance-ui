<template>
  <div>
    <div v-if="leftToWait === 0">
      <ui-button>Withdrawal to wallet</ui-button>
      <ui-button
        v-if="nextPool"
        :to="{ name: nextPool.name.toLocaleLowerCase() }"
      >
        Migrate to {{ nextPool.name }} pool with {{ 123456 }} APY
        <ui-icon
          name="arrow-right"
          class="ml-8"
        />
      </ui-button>
    </div>

    <div v-else>
      <p>80% unstaking fee if withdraw within {{ leftToWait }} days</p>
      <ui-button>Withdrawal to wallet</ui-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import { useInterval } from '@vueuse/shared'
  import UiButton from '@/components/ui/UiButton.vue'
  import type { PoolType } from '@/config/constants/Pools'
  import { useNextPool } from '@/hooks/useNextPool'
  import UiIcon from '@/components/ui/UiIcon.vue'

  export default defineComponent({
    props: {
      pool: {
        type: Object as PropType<PoolType>,
        required: true,
      },
    },
    setup(props) {
      const counter = useInterval(1000)
      const leftToWait = computed(() => Math.max(0, 10 - counter.value))
      const nextPool = useNextPool(props.pool)

      return {
        leftToWait,
        nextPool,
      }
    },
    components: {
      UiButton,
      UiIcon,
    },
  })
</script>
