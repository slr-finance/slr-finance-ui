import BigNumber from 'bignumber.js'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { ref, computed, markRaw, Ref, ComputedRef } from 'vue'
import { fetchReserves } from '@/utils/tokens/fetchReserves'
import { BigNumber as BigNumberEthers } from 'ethers'
import { bigToWei, BIG_ONE, parseWei } from '@/utils/bigNumber'
import { useIntervalFn } from '@vueuse/core'

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
  tokenIn: string
  tokenOut: string
  tokenInSymbol: string
  tokenOutSymbol: string
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

  const amountInWithFee = amountInWei.mul(10000 - fee)

  return amountInWithFee.mul(reserveOut).div(reserveIn.mul(10000).add(amountInWithFee))
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
    .mul(10000)
    .div(reserveOut.sub(amountOut).mul(10000 - fee))
    .add(1)
}

const DEX_FEE = 0.002

export const useSwap = () => {
  const tokenInIconName = ref('bnb')
  const tokenOutIconName = ref('slr')
  const isInsufficientLiquidity = ref(false)
  const priceImpact = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const amountIn = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const amountOut = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>
  const slippage = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>

  const dexFeeWithTokenFee = computed(() => {
    return BIG_ONE.minus(BIG_ONE.minus(swapFee.value).times(BIG_ONE.minus(DEX_FEE)))
      .times(10000)
      .integerValue(BigNumber.ROUND_UP)
      .toNumber()
  })

  const swapSide = () => {
    const tokenInAddressStr = swapParams.value.tokenIn
    swapParams.value.tokenIn = swapParams.value.tokenOut
    swapParams.value.tokenOut = tokenInAddressStr

    const tokenInSymbolStr = swapParams.value.tokenInSymbol
    swapParams.value.tokenInSymbol = swapParams.value.tokenOutSymbol
    swapParams.value.tokenOutSymbol = tokenInSymbolStr

    const tokenInIconNameStr = tokenInIconName.value
    tokenInIconName.value = tokenOutIconName.value
    tokenOutIconName.value = tokenInIconNameStr

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

    const swapParamsVal = swapParams.value

    // Recalculate opposite amount swapping
    if (swapParamsVal.tradeType === TradeType.EXACT_INPUT) {
      handleTypeInput(amountIn.value)
    } else {
      handleTypeOutput(amountOut.value)
    }
  }

  const swapParams: Ref<SwapParams> = ref({
    tradeType: TradeType.EXACT_INPUT,
    amountIn: BigNumberEthers.from(0),
    amountOut: BigNumberEthers.from(0),
    amountInMax: BigNumberEthers.from(0),
    amountOutMin: BigNumberEthers.from(0),
    tokenIn: contractsAddresses.BnbToken,
    tokenOut: contractsAddresses.SolarToken,
    tokenInSymbol: 'BNB',
    tokenOutSymbol: 'SLR',
  })
  const swapFee = computed(() => {
    if (swapParams.value.tokenOut === contractsAddresses.SolarToken) {
      return new BigNumber(0.1)
    }

    return new BigNumber(0.15)
  }) as ComputedRef<BigNumber>
  const pairReserves = ref({
    [swapParams.value.tokenOut]: BigNumberEthers.from(0),
    [swapParams.value.tokenIn]: BigNumberEthers.from(0),
  }) as Ref<Record<string, BigNumberEthers>>
  const reserveInWei = computed(() => pairReserves.value[swapParams.value.tokenIn])
  const reserveOutWei = computed(() => pairReserves.value[swapParams.value.tokenOut])

  const updatePriceImpact = (inputAmount: BigNumberEthers, outputAmount: BigNumberEthers) => {
    priceImpact.value = computePriceImpact(
      parseWei(reserveInWei.value, 18),
      parseWei(reserveOutWei.value, 18),
      parseWei(inputAmount, 18),
      parseWei(outputAmount, 18),
    )
  }

  const handleTypeInput = (value: BigNumber) => {
    const amountInWei = bigToWei(value, 18)
    const amountOutWei = getAmountOut(amountInWei, reserveInWei.value, reserveOutWei.value, DEX_FEE * 10000)
    const amountOutMinWei = getAmountOut(amountInWei, reserveInWei.value, reserveOutWei.value, dexFeeWithTokenFee.value)
    const isInsufficientLiquidityBool = amountOutWei.lte(0)

    isInsufficientLiquidity.value = isInsufficientLiquidityBool
    swapParams.value.amountIn = amountInWei
    swapParams.value.amountInMax = amountInWei
    swapParams.value.amountOut = amountOutWei
    swapParams.value.amountOutMin = amountOutMinWei
    swapParams.value.tradeType = TradeType.EXACT_INPUT

    amountOut.value = isInsufficientLiquidityBool ? new BigNumber(0) : parseWei(amountOutWei, 18)
    amountIn.value = value

    updatePriceImpact(amountInWei, amountOutWei)
  }

  const handleTypeOutput = (value: BigNumber) => {
    const { [swapParams.value.tokenIn]: reserveInWei, [swapParams.value.tokenOut]: reserveOutWei } = pairReserves.value

    const amountOutWei = bigToWei(value, 18)
    const amountInWei = getAmountIn(amountOutWei, reserveInWei, reserveOutWei, DEX_FEE * 10000)
    const amountInMaxWei = getAmountIn(amountOutWei, reserveInWei, reserveOutWei, dexFeeWithTokenFee.value)
    const isInsufficientLiquidityBool = amountInWei.lte(0)

    isInsufficientLiquidity.value = isInsufficientLiquidityBool
    swapParams.value.amountOut = amountOutWei
    swapParams.value.amountOutMin = amountOutWei
    swapParams.value.amountIn = amountInWei
    swapParams.value.amountInMax = amountInMaxWei
    swapParams.value.tradeType = TradeType.EXACT_OUTPUT

    amountIn.value = isInsufficientLiquidityBool ? new BigNumber(0) : parseWei(amountInWei, 18)
    amountOut.value = value

    updatePriceImpact(amountInWei, amountOutWei)
  }

  const isZeroAmount = computed(() => {
    const swapParamsVal = swapParams.value

    return swapParamsVal.amountIn.lte(0) && swapParamsVal.amountOut.lte(0)
  })

  useIntervalFn(fetchPairState, 10000, { immediateCallback: true })

  return {
    handleTypeInput,
    handleTypeOutput,
    fetchPairState,
    swapSide,
    swapParams,
    priceImpact,
    isInsufficientLiquidity,
    isZeroAmount,
    tokenInIconName,
    tokenOutIconName,
    amountIn,
    amountOut,
    slippage,
    swapFee,
  }
}
