<template>
  <div class="flex justify-between items-center text-white text-opacity-60 text-12">
    <div class="flex justify-center items-center">
      <picture>
        <source
          srcset="/images/pools/point/point.webp"
          type="image/webp"
        />
        <img
          src="/images/pools/point/point.jpg"
          class="rounded-8 pointer-events-none select-none mr-20"
          width="30"
          height="30"
        />
      </picture>
      Total pool staked
    </div>
    <div
      class="flex justify-center items-center cursor-default border border-white border-opacity-20 px-12 py-8 rounded-8"
    >
      <ui-icon
        name="lock"
        size="14"
        class="mr-6"
      />
      {{ tvlStr }}
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { stakingModule } from '@/store/modules/stakingModule'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'pool-tvl',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const store = useStore()
      stakingModule.register(store)
      const poolState = computed(() => stakingModule.getters.getPool(props.poolId))
      const totalStaked = computed(() => poolState.value.totalStaked)
      const tvlStr = useTokenAmountFormat(totalStaked, 'SLR')

      return { tvlStr }
    },
    components: { UiIcon },
  })
</script>
