<template>
  <div class="ui-box-corners mb-24 cursor-default">
    <p class="text-14">
      Will be earned: <span class="text-page-active">{{ profitStr }} ({{ profitInDollStr }})</span>
    </p>
    <p class="text-14 text-white/60">{{ withdrawalFeeStr }} unstaking fee if withdraw within {{ daysStr }}</p>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRef } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiInputBn from '@/components/ui/UiInputBn.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import { useUsdPrice } from '@/hooks/useUsdPrice'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import { usePool } from '@/store/hooks/usePool'
  import { useProfit } from '../hooks/useProfit'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import BigNumber from 'bignumber.js'
  import UiInputRange from '@/components/ui/UiInputRange.vue'
  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'staking-profit',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
      days: {
        type: Number,
        required: true,
      },
      amount: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
    },
    setup(props) {
      const { t } = useI18n()
      const poolState = usePool(toRef(props, 'poolId'))
      const amount = toRef(props, 'amount')

      const days = toRef(props, 'days')
      const daysStr = computed(() => {
        const daysValue = days.value

        return t('common.days', [daysValue], daysValue)
      })

      const apr = computed(() => poolState.value.apr)
      const withdrawalFee = computed(() => poolState.value.withdrawalFee)

      const profit = useProfit(amount, apr, days)
      const profitStr = useTokenAmountFormat(profit, 'SLN', 5)
      const profitInDollStr = useUsdFormat(useUsdPrice(profit))
      const withdrawalFeeStr = usePercentFormat(withdrawalFee)

      return {
        amount,
        profitStr,
        profitInDollStr,
        withdrawalFeeStr,
        daysStr,
      }
    },
    components: {
      UiButton,
      UiInputBn,
      ConnectWalletPlug,
      SendTxButton,
      UiInputRange,
      ApproveTokenPlug,
    },
  })
</script>
