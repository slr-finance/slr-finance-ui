<template>
  <ui-input
    v-model:value="valueStr"
    :placeholder="placeholder"
    inputmode="decimal"
    @input="handleInput"
  >
    <template #postfix><slot name="postfix" /></template>
  </ui-input>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch, markRaw, Ref } from 'vue'
  import { useVModel } from '@vueuse/core'
  import BigNumber from 'bignumber.js'
  import { UiInput } from '@slr-finance/uikit'

  const stringToBn = (value: string, defaultBn: BigNumber) => {
    const preparedStr = value.replace(/[^\d,\.]/g, '').replace(/([\.,])(?=\d*[\.,])/g, '')

    if (preparedStr.length === 0) {
      return new BigNumber(0)
    }

    const bn = new BigNumber(preparedStr.replace(/,/g, '.'))

    if (bn.isFinite()) {
      return bn
    } else {
      return new BigNumber(defaultBn)
    }
  }

  export default defineComponent({
    name: 'ui-input-bn',
    props: {
      value: {
        type: Object as PropType<BigNumber>,
        default: new BigNumber(0),
      },
      placeholder: {
        type: String,
        default: 'Amount',
      },
    },
    emits: ['update:value', 'input'],
    setup(props, { emit }) {
      const valueBn = useVModel(props, 'value', emit, { passive: true }) as Ref<BigNumber>
      const valueStr = ref(valueBn.value.toFixed())

      watch(valueBn, (value) => (valueStr.value = value.isFinite() ? value.toFixed() : ''))
      watch(valueStr, (str) => {
        valueBn.value = markRaw(stringToBn(str, valueBn.value))
      })

      const handleInput = (str: string) => {
        emit('input', stringToBn(str, valueBn.value))
      }

      return {
        valueStr,
        handleInput,
      }
    },
    components: {
      UiInput,
    },
  })
</script>
