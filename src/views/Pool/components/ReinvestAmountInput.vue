<template>
  <ui-input-bn
    v-model:value="amount"
    @update:value.once="handleChangeOnce"
  >
    <template #postfix>
      <div>
        <button
          type="button"
          @click="handleSetMaxAmount"
        >
          MAX
        </button>
        SLR
      </div>
    </template>
  </ui-input-bn>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch, computed } from 'vue'
  import UiInputBn from '@/components/ui/UiInputBn.vue'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { FetchingStatus } from '@/entities/common'
  import BigNumber from 'bignumber.js'
  import { useVModel } from '@vueuse/core'
  import { useStaker } from '@/store/hooks/useStaker'

  export default defineComponent({
    name: 'reinvest-amout-input',
    props: {
      value: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
    },
    setup(props, { emit }) {
      const [stakerState] = useStaker()
      const amount = useVModel(props, 'value', emit, { passive: true })
      const isChanged = ref(false)
      const maxAmount = computed(() => {
        const { amount, reward } = stakerState.value
        console.log(amount.plus(reward).toFixed())
        return amount.plus(reward)
      })

      const handleChangeOnce = () => (isChanged.value = true)
      const handleSetMaxAmount = () => (amount.value = maxAmount.value)

      watch(
        stakerState,
        (stakerStateValue) => {
          if (stakerStateValue.fetchStatus === FetchingStatus.FETCHED && !isChanged.value) {
            handleSetMaxAmount()
          }
        },
        { immediate: true },
      )

      return {
        amount,
        handleSetMaxAmount,
        handleChangeOnce,
      }
    },
    components: { UiInputBn },
  })
</script>
