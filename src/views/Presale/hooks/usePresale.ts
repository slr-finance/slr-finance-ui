import type { BigNumber as BigNumberEthers } from 'ethers'
import PresaleAbi from '@/config/abi/Presale.json'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { BIG_ONE, parseWei } from '@/utils/bigNumber'
import { Call, multicall } from '@/utils/contracts/multicall'
import BigNumber from 'bignumber.js'
import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { computedEager } from '@vueuse/core'

const presaleServiceAddress = contractsAddresses.PresaleService

const currentPhase = ref(0)
const isFetching = ref(false)
const isInitalFetched = ref(false)

// Referrer reward [BEGIN]
const referrerRewardPercentRaw = ref(0)
const referrerRewardDivider = ref(0)
const referrerRewardPercent = computedEager(() => referrerRewardPercentRaw.value / referrerRewardDivider.value)
// Referrer reward [END]

// Phases amounts [BEGIN]
const totalSupply = ref(new BigNumber(0)) as Ref<BigNumber>
const phasesMaxAmount = ref([new BigNumber(0), new BigNumber(0), new BigNumber(0)]) as Ref<BigNumber[]>
const phasesAmount = ref([new BigNumber(0), new BigNumber(0), new BigNumber(0)]) as Ref<BigNumber[]>
// Phases amounts [END]

// Phases prices [BEGIN]
const prices = ref([new BigNumber(0), new BigNumber(0), new BigNumber(0)]) as Ref<BigNumber[]>
const launchingPrice = ref(new BigNumber(0)) as Ref<BigNumber>
const phasesDiscounts = computed(() => {
  const launchingPriceVal = launchingPrice.value

  return prices.value.map((price) => BIG_ONE.minus(price.div(launchingPriceVal)))
})

const currentPhasePrice = computed(() => {
  const currentPhaseVal = currentPhase.value

  return currentPhaseVal > 0 && currentPhaseVal < 4 ? prices.value[currentPhaseVal - 1] : new BigNumber(0)
}) as ComputedRef<BigNumber>
// Phases prices [END]

// Current phase time and countdown [BEGIN]
const phasesTime = ref([0, 0, 0, 0])
const currentPhaseEndTime = ref(0)
const currentPhaseCountdown = ref(0)

setInterval(() => {
  currentPhaseCountdown.value -= 1
}, 1000)
// const currentPhaseTime = computed(() => {
//   const currentPhaseVal = currentPhase.value

//   return currentPhaseVal < 4 ? phasesTime.value[currentPhaseVal] : 0
// })
// const currentPhaseCountdown = computed(() => Math.max(0, currentPhaseTime.value - blockTimestamp.value))

// Current phase time and countdown [END]

const methods = [
  {
    name: 'totalSupply',
    handler: (valRaw: BigNumberEthers) => (totalSupply.value = parseWei(valRaw, 18)),
  },
  {
    name: 'getPhase',
    handler: (valRaw: number) => (currentPhase.value = valRaw),
  },
  {
    name: 'getPrices',
    handler: (valRaw: BigNumberEthers[]) => (prices.value = valRaw.map((priceRaw) => parseWei(priceRaw, 18))),
  },
  {
    name: 'getPhasesMaxAmount',
    handler: (valRaw: BigNumberEthers[]) =>
      (phasesMaxAmount.value = valRaw.map((maxAmountRaw) => parseWei(maxAmountRaw, 18))),
  },
  {
    name: 'getPhasesAmount',
    handler: (valRaw: BigNumberEthers[]) => (phasesAmount.value = valRaw.map((amountRaw) => parseWei(amountRaw, 18))),
  },
  {
    name: 'getPhasesTime',
    handler: (valRaw: BigNumberEthers[]) => (phasesTime.value = valRaw.map((timeRaw) => timeRaw.toNumber())),
  },
  {
    name: 'referrerRewardPercent',
    handler: (valRaw: BigNumberEthers) => (referrerRewardPercentRaw.value = valRaw.toNumber()),
  },
  {
    name: 'referrerRewardDivider',
    handler: (valRaw: BigNumberEthers) => (referrerRewardDivider.value = valRaw.toNumber()),
  },
  {
    name: 'getCurrentPhaseCountdown',
    handler: (valRaw: number) => (currentPhaseCountdown.value = valRaw),
  },
  {
    name: 'getCurrentPhaseEndTime',
    handler: (valRaw: number) => (currentPhaseEndTime.value = valRaw),
  },
  {
    name: 'launchingTokenPrice',
    handler: (valRaw: BigNumberEthers) => (launchingPrice.value = parseWei(valRaw, 18)),
  },
]

let calls: Call[] = methods.map(({ name }) => ({
  address: presaleServiceAddress,
  name,
}))

const fetchPresaleState = async () => {
  isFetching.value = true

  try {
    const [rawData] = await multicall(PresaleAbi, calls)
    methods.forEach(({ handler }, index) => handler(rawData[index][0]))

    isInitalFetched.value = true
  } catch (error) {
    console.error(error)
  } finally {
    isFetching.value = false
  }
}

setInterval(() => {
  if (currentPhase.value < 4) {
    fetchPresaleState()
  }
}, 60000)

watch([currentPhaseCountdown], () => {
  if (currentPhaseCountdown.value === 0 && currentPhase.value < 4) {
    fetchPresaleState()
  }
})

export const usePresale = () => {
  if (!isInitalFetched.value && !isFetching.value) {
    fetchPresaleState()
  }

  return {
    fetchPresale: fetchPresaleState,
    isFetching,
    isInitalFetched,
    totalSupply,
    currentPhase,
    currentPhasePrice,
    prices,
    phasesDiscounts,
    launchingPrice,
    phasesMaxAmount,
    phasesAmount,
    phasesTime,
    currentPhaseCountdown,
    currentPhaseEndTime,
    referrerRewardPercent,
  }
}
