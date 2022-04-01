<template>
  <ui-input
    v-model:value="valueStr"
    :placeholder="placeholder"
    inputmode="decimal"
  >
    <template #postfix><slot name="postfix" /></template>
  </ui-input>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch, markRaw } from 'vue'
  import { useVModel } from '@vueuse/core'
  import BigNumber from 'bignumber.js'
  import UiInput from './UiInput.vue'

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
    emits: ['update:value'],
    setup(props, { emit }) {
      const valueBn = useVModel(props, 'value', emit, { passive: true })
      const valueStr = ref(valueBn.value.toString())

      watch(valueBn, (value) => (valueStr.value = value.isFinite() ? value.toString() : ''))
      watch(valueStr, (str) => {
        const preparedStr = str.replace(/[^\d,\.]/g, '').replace(/([\.,])(?=\d*[\.,])/g, '')

        if (preparedStr.length === 0) {
          valueBn.value = markRaw(new BigNumber(0))
        }
        const bn = new BigNumber(preparedStr.replace(/,/g, '.'))

        if (bn.isFinite()) {
          valueBn.value = markRaw(bn)
        } else {
          valueBn.value = markRaw(new BigNumber(valueBn.value))
        }
      })

      return {
        valueStr,
      }
    },
    components: {
      UiInput,
    },
  })
</script>
