<template>
  <ui-input-bn
    v-model:value="amount"
    @update:value.once="handleChangeOnce"
  >
    <template #postfix>
      <div class="text-12 flex justify-center items-center space-x-8">
        <button
          class="bg-green-atomic bg-opacity-10 text-green-atomic text-opacity-50 text-12 leading-none rounded-4 px-4 py-6 uppercase hover:bg-opacity-20 hover:text-opacity-100 active:bg-opacity-30 transition-colors duration-200"
          type="button"
          @click="handleSetMaxAmount"
        >
          Max
        </button>
        <div>SLR</div>
      </div>
    </template>
  </ui-input-bn>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch, WritableComputedRef } from 'vue'
  import UiInputBn from '@/components/ui/UiInputBn.vue'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
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
      const { isFetching, balance } = useSlrBalance()
      const amount = useVModel(props, 'value', emit, { passive: true }) as WritableComputedRef<BigNumber>
      const isChanged = ref(false)

      watch(
        isFetching,
        (isFetchingVal) => {
          if (!isFetchingVal && !isChanged.value) {
            amount.value = balance.value
          }
        },
        { immediate: true },
      )

      const handleChangeOnce = () => (isChanged.value = true)
      const handleSetMaxAmount = () => (amount.value = balance.value)

      return {
        amount,
        handleSetMaxAmount,
        handleChangeOnce,
      }
    },
    components: { UiInputBn },
  })
</script>
