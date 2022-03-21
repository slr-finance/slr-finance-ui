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
  import { defineComponent, PropType, ref, watch, WritableComputedRef } from 'vue'
  import UiInputBn from '@/components/ui/UiInputBn.vue'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { FetchingStatus } from '@/entities/common'
  import BigNumber from 'bignumber.js'
  import { useVModel } from '@vueuse/core'

  export default defineComponent({
    name: 'slr-balance-input',
    props: {
      value: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
    },
    setup(props, { emit }) {
      const [slrBalance] = useSlrBalance()
      const amount = useVModel(props, 'value', emit, { passive: true }) as WritableComputedRef<BigNumber>
      const isChanged = ref(false)

      watch(
        slrBalance,
        (balanceInfo) => {
          if (balanceInfo.fetchStatus === FetchingStatus.FETCHED && !isChanged.value) {
            amount.value = balanceInfo.balance
          }
        },
        { immediate: true },
      )

      const handleChangeOnce = () => (isChanged.value = true)
      const handleSetMaxAmount = () => (amount.value = slrBalance.value.balance)

      return {
        amount,
        handleSetMaxAmount,
        handleChangeOnce,
      }
    },
    components: { UiInputBn },
  })
</script>
