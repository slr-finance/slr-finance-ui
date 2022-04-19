<template>
  <div
    class="bg-opacity-20 flex items-center w-max px-6 rounded-18 text-center h-18 text-12 ml-auto"
    :class="{
      'text-aqua bg-aqua': action === REFERRALS_ACTIONS.Presale,
      'text-pink bg-pink': action === REFERRALS_ACTIONS.Staking,
      'text-yellow bg-yellow': action === REFERRALS_ACTIONS.Transfer,
      'text-red bg-red': action === REFERRALS_ACTIONS.Sell,
      'text-green-original bg-green-original': action === REFERRALS_ACTIONS.Buy,
    }"
  >
    <span>
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { REFERRALS_ACTIONS } from '@/config/constants/referrals'

  export default defineComponent({
    name: 'accrual-label',
    props: {
      action: {
        type: Number as PropType<REFERRALS_ACTIONS>,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
    setup() {
      return { REFERRALS_ACTIONS }
    },
  })
</script>
