import { markRaw, onMounted, ref, Ref } from 'vue'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import MilkyWayAbi from '@/config/abi/MilkyWay.json'
import { Call, multicall } from '@/utils/contracts/multicall'
import { parseWei } from '@/utils/bigNumber'
import BigNumber from 'bignumber.js'

export const useMilkyWayInfo = () => {
  const totalBayback = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const currentBnbBalance = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const totalLiquidityBurned = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const totalWilkyWayRewards = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const totalWilkyWayInvested = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const pendingBuyBackAndBurn = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const pendingInvest = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>

  const calls: Call[] = [
    {
      name: 'totalBayback',
      address: contractsAddresses.MilkyWay,
    },
    {
      name: 'calcAmountToBayback',
      address: contractsAddresses.MilkyWay,
    },
    {
      name: 'calcAmountToInvest',
      address: contractsAddresses.MilkyWay,
    },
  ]

  const handleLoad = async () => {
    const [[[totalBaybackRaw], [pendingBuyBackAndBurnRaw], [pendingInvestRaw]]] = await multicall(MilkyWayAbi, calls)

    totalBayback.value = markRaw(parseWei(totalBaybackRaw, 18))
    pendingBuyBackAndBurn.value = markRaw(parseWei(pendingBuyBackAndBurnRaw, 18))
    pendingInvest.value = markRaw(parseWei(pendingInvestRaw, 18))
  }

  onMounted(() => handleLoad())

  return {
    totalBayback,
    currentBnbBalance,
    totalLiquidityBurned,
    totalWilkyWayRewards,
    totalWilkyWayInvested,
    pendingBuyBackAndBurn,
    pendingInvest,
  }
}
