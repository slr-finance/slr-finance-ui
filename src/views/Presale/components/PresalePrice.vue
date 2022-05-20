<template>
  <span>{{ amountStr }} SLR per 1 BNB</span>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { BIG_ONE } from '@/utils/bigNumber'
  import { usePresale } from '../hooks/usePresale'

  export default defineComponent({
    props: {
      phase: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const { prices } = usePresale()

      const amountStr = computed(() => {
        const { phase } = props

        if (phase < 1 || phase > 3) {
          return '0'
        }

        return BIG_ONE.div(prices.value[phase - 1])
          .toNumber()
          .toLocaleString('en-En', {
            style: 'decimal',
          })
      })

      return { amountStr }
    },
  })
</script>
