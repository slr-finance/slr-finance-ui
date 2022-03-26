<template>
  <div class="flex justify-between items-center text-white text-opacity-60 text-12">
    <div>Total Staked</div>
    <div
      class="flex justify-between items-center cursor-default border border-white border-opacity-20 px-12 py-8 rounded-8"
    >
      {{ tvlStr }}
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { stakingModule } from '@/store/modules/stakingModule'

  export default defineComponent({
    name: 'pool-tvl',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const poolState = computed(() => stakingModule.getters.getPool(props.poolId))
      const totalStaked = computed(() => poolState.value.totalStaked)
      const tvlStr = useTokenAmountFormat(totalStaked, 'SLR')

      return { tvlStr }
    },
    components: { UiIcon },
  })
</script>
