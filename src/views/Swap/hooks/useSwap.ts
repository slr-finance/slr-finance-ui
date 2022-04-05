import BigNumber from 'bignumber.js'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { ref, computed, markRaw, Ref, ComputedRef } from 'vue'
import { fetchReserves } from '@/utils/tokens/fetchReserves'

function getAmountOut(amountIn: BigNumber, reserveIn: BigNumber, reserveOut: BigNumber, fee: number) {
  const amountInWithFee = amountIn.times(1 - fee)

  return amountInWithFee.times(reserveOut).div(reserveIn.plus(amountInWithFee))
}

export const useSwap = () => {
  const tokenInAddress = ref('')
  const tokenOutAddress = ref('')
  const tokenInSymbol = ref('SLR')
  const tokenOutSymbol = ref('BNB')
  const pairReserves = ref({
    [tokenOutAddress.value]: markRaw(new BigNumber(0)),
    [tokenInAddress.value]: markRaw(new BigNumber(0)),
  })
  const amountIn = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const amountOut = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const slippage = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const swapFee = computed(() => {
    if (tokenOutAddress.value === contractsAddresses.SolarToken) {
      return new BigNumber(0.15)
    }

    return new BigNumber(0.1)
  }) as ComputedRef<BigNumber>

  const amounts = computed(() => [amountIn.value, amountOut.value])

  const swapSide = () => {
    const tokenInAddressStr = tokenInAddress.value
    tokenInAddress.value = tokenOutAddress.value
    tokenOutAddress.value = tokenInAddressStr

    const tokenInSymbolStr = tokenInSymbol.value
    tokenInSymbol.value = tokenOutSymbol.value
    tokenOutSymbol.value = tokenInSymbolStr

    amountOut.value = amountIn.value
  }

  const fetchPairInfo = async () => {
    const [{ token0, token1, reserves }] = await fetchReserves([contractsAddresses.SolarPair])
    // todo: добавить проверку что пара корректа

    pairReserves.value[token0] = markRaw(reserves[0])
    pairReserves.value[token1] = markRaw(reserves[1])
  }

  const path = computed(() => [tokenOutAddress.value, tokenInAddress.value])

  fetchPairInfo()

  return {
    fetchPairInfo,
    swapSide,
    tokenInAddress,
    tokenOutAddress,
    tokenInSymbol,
    tokenOutSymbol,
    path,
    amounts,
    amountIn,
    amountOut,
    slippage,
    swapFee,
  }
}
