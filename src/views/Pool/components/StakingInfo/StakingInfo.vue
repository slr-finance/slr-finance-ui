<template>
  <staking-info-wrapper>
    <staking-info-item
      label="Annual Percentage Yield"
      :value="apyStr"
    />

    <staking-info-item
      label="Total amount staked in this pool"
      :value="'101 230 131'"
    />

    <staking-info-item
      label="Solar token price"
      :value="'$ 24.2321'"
    />

    <staking-info-item
      label="Total value locked"
      :value="'$ 89,249,234'"
    />
  </staking-info-wrapper>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import StakingInfoItem from './StakingInfoItem.vue'
  import StakingInfoWrapper from './StakingInfoWrapper.vue'

  export default defineComponent({
    name: 'staking-info',
    props: {
      pool: {
        type: Object,
        require: true,
      },
    },
    setup(props) {
      const apyStr = computed(() => `${(123456).toLocaleString()}%`)

      return {
        apyStr,
      }
    },
    components: {
      StakingInfoItem,
      StakingInfoWrapper,
    },
  })
</script>
