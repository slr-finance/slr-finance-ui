import BigNumber from 'bignumber.js'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { ref, computed, markRaw, Ref, ComputedRef } from 'vue'
import { fetchReserves } from '@/utils/tokens/fetchReserves'
import { BigNumber as BigNumberEthers } from 'ethers'
import { bigToWei, parseWei } from '@/utils/bigNumber'

export enum TradeType {
  EXACT_INPUT = 0,
  EXACT_OUTPUT = 1,
}

export type SwapParams = {
  tradeType: TradeType
  amountIn: BigNumberEthers
  amountOut: BigNumberEthers
  amountInMax: BigNumberEthers
  amountOutMin: BigNumberEthers
}

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 *
 * @param reserveIn
 * @param reserveOut
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */
function computePriceImpact(
  reserveIn: BigNumber,
  reserveOut: BigNumber,
  inputAmount: BigNumber,
  outputAmount: BigNumber,
) {
  const midPrice = reserveOut.div(reserveIn)
  const exactQuote = midPrice.times(inputAmount) // calculate slippage := (exactQuote - outputAmount) / exactQuote
  const slippage = exactQuote.minus(outputAmount).div(exactQuote)

  return slippage
}

function getAmountOut(
  amountInWei: BigNumberEthers,
  reserveIn: BigNumberEthers,
  reserveOut: BigNumberEthers,
  fee: number,
): BigNumberEthers {
  if (reserveIn.eq(0)) {
    return BigNumberEthers.from(0)
  }

  const amountInWithFee = amountInWei.mul(1000 - fee)

  return amountInWithFee.mul(reserveOut).div(reserveIn.mul(1000).add(amountInWithFee))
}

function getAmountIn(
  amountOut: BigNumberEthers,
  reserveIn: BigNumberEthers,
  reserveOut: BigNumberEthers,
  fee: number,
): BigNumberEthers {
  if (reserveOut.eq(0) || amountOut.eq(0) || fee === 0) {
    return BigNumberEthers.from(0)
  }

  return reserveIn
    .mul(amountOut)
    .mul(1000)
    .div(reserveOut.sub(amountOut).mul(1000 - fee))
    .add(1)
}

const DEX_FEE = 2

export const useSwap = () => {
  const tokenInAddress = ref(contractsAddresses.SolarToken)
  const tokenOutAddress = ref(contractsAddresses.BnbToken)
  const tokenInSymbol = ref('SLR')
  const tokenOutSymbol = ref('BNB')
  const pairReserves = ref({
    [tokenOutAddress.value]: BigNumberEthers.from(0),
    [tokenInAddress.value]: BigNumberEthers.from(0),
  }) as Ref<Record<string, BigNumberEthers>>
  const insufficientLiquidity = ref(false)
  const priceImpact = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
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

    if (swapParams.value.tradeType === TradeType.EXACT_INPUT) {
      handleTypeOutput(amountIn.value)
    } else {
      handleTypeInput(amountOut.value)
    }
  }

  const fetchPairState = async () => {
    const [{ token0, token1, reserves }] = await fetchReserves([contractsAddresses.SolarPair])
    // todo: добавить проверку что пара корректа

    pairReserves.value[token0] = reserves[0]
    pairReserves.value[token1] = reserves[1]
  }

  const swapParams: Ref<SwapParams> = ref({
    tradeType: TradeType.EXACT_INPUT,
    amountIn: BigNumberEthers.from(0),
    amountOut: BigNumberEthers.from(0),
    amountInMax: BigNumberEthers.from(0),
    amountOutMin: BigNumberEthers.from(0),
  })

  const updatePriceImpact = (inputAmount: BigNumberEthers, outputAmount: BigNumberEthers) => {
    const { [tokenInAddress.value]: reserveInWei, [tokenOutAddress.value]: reserveOutWei } = pairReserves.value

    priceImpact.value = computePriceImpact(
      parseWei(reserveInWei, 18),
      parseWei(reserveOutWei, 18),
      parseWei(inputAmount, 18),
      parseWei(outputAmount, 18),
    )
  }

  const handleTypeInput = (value: BigNumber) => {
    const { [tokenInAddress.value]: reserveInWei, [tokenOutAddress.value]: reserveOutWei } = pairReserves.value

    const amountInWei = bigToWei(value, 18)
    const amountOutWei = getAmountOut(amountInWei, reserveInWei, reserveOutWei, DEX_FEE)
    const insufficientLiquidityBool = amountOutWei.lte(0)

    insufficientLiquidity.value = insufficientLiquidityBool
    swapParams.value.amountIn = amountInWei
    swapParams.value.amountInMax = amountInWei
    swapParams.value.amountOut = amountOutWei
    swapParams.value.amountOutMin = amountOutWei
    swapParams.value.tradeType = TradeType.EXACT_INPUT

    amountOut.value = insufficientLiquidityBool ? new BigNumber(0) : parseWei(amountOutWei, 18)
    amountIn.value = value

    updatePriceImpact(amountInWei, amountOutWei)
  }

  const handleTypeOutput = (value: BigNumber) => {
    const { [tokenInAddress.value]: reserveInWei, [tokenOutAddress.value]: reserveOutWei } = pairReserves.value

    const amountOutWei = bigToWei(value, 18)
    const amountInWei = getAmountIn(amountOutWei, reserveInWei, reserveOutWei, DEX_FEE)
    const insufficientLiquidityBool = amountInWei.lte(0)

    insufficientLiquidity.value = insufficientLiquidityBool
    swapParams.value.amountOut = amountOutWei
    swapParams.value.amountOutMin = amountOutWei
    swapParams.value.amountIn = amountInWei
    swapParams.value.amountInMax = amountInWei
    swapParams.value.tradeType = TradeType.EXACT_OUTPUT

    amountIn.value = insufficientLiquidityBool ? new BigNumber(0) : parseWei(amountInWei, 18)
    amountOut.value = value

    updatePriceImpact(amountInWei, amountOutWei)
  }

  const path = computed(() => [tokenInAddress.value, tokenOutAddress.value])

  fetchPairState()

  return {
    handleTypeInput,
    handleTypeOutput,
    fetchPairState,
    swapSide,
    swapParams,
    priceImpact,
    insufficientLiquidity,
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
