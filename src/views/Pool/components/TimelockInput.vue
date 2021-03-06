<template>
  <ui-input-range
    :min="poolState.minDays"
    :max="poolState.maxDays"
    :step="1"
    :fetching="!isFetched"
    v-model:value="days"
  >
    <template #value="{ value }"> {{ value }} days </template>
  </ui-input-range>
</template>

<script lang="ts">
  import { defineComponent, watch, toRef, ref } from 'vue'
  import { usePool } from '@/store/hooks/usePool'
  import UiInputRange from '@/components/ui/UiInputRange.vue'
  import { useVModel } from '@vueuse/core'
  import { FetchingStatus } from '@/entities/common'

  export default defineComponent({
    name: 'timelock-input',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
      value: {
        type: Number,
        default: 0,
      },
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const days = useVModel(props, 'value', emit, { passive: true })
      const poolState = usePool(toRef(props, 'poolId'))
      const isFetched = ref(false)

      watch(
        poolState,
        (poolStateValue) => {
          if (poolStateValue.fetchStatus === FetchingStatus.FETCHED) {
            days.value = poolStateValue.maxDays
            isFetched.value = true
          } else {
            isFetched.value = false
          }
        },
        { immediate: true },
      )

      return {
        days,
        isFetched,
        poolState,
      }
    },
    components: { UiInputRange },
  })
</script>
