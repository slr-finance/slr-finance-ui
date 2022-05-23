import type { BigNumber as BigNumberEthers } from 'ethers'
import PresaleAbi from '@/config/abi/Presale.json'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { parseWei } from '@/utils/bigNumber'
import { Call, multicall } from '@/utils/contracts/multicall'
import BigNumber from 'bignumber.js'
import { Ref, ref } from 'vue'
import { computedEager } from '@vueuse/core'

const presaleServiceAddress = contractsAddresses.PresaleService

const totalSupply = ref(new BigNumber(0)) as Ref<BigNumber>
const currentPhase = ref(0)
const prices = ref([new BigNumber(0), new BigNumber(0), new BigNumber(0)]) as Ref<BigNumber[]>
const phasesMaxAmount = ref([new BigNumber(0), new BigNumber(0), new BigNumber(0)]) as Ref<BigNumber[]>
const phasesAmount = ref([new BigNumber(0), new BigNumber(0), new BigNumber(0)]) as Ref<BigNumber[]>
const phasesTime = ref([0, 0, 0, 0])
const isFetching = ref(false)
const isInitalFetched = ref(false)
const currentPhasePrice = computedEager(() => {
  const currentPhaseVal = currentPhase.value

  return currentPhaseVal > 0 && currentPhaseVal < 4 ? prices.value[currentPhaseVal - 1] : new BigNumber(0)
})

const methods = [
  {
    name: 'totalSupply',
    handler: (valRaw: BigNumberEthers) => totalSupply.value = parseWei(valRaw, 18),
  },
  {
    name: 'getPhase',
    handler: (valRaw: number) => currentPhase.value = valRaw,
  },
  {
    name: 'getPrices',
    handler: (valRaw: BigNumberEthers[]) => prices.value = valRaw.map((priceRaw) => parseWei(priceRaw, 18)),
  },
  {
    name: 'getPhasesMaxAmount',
    handler: (valRaw: BigNumberEthers[]) =>
      (phasesMaxAmount.value = valRaw.map((maxAmountRaw) => parseWei(maxAmountRaw, 18))),
  },
  {
    name: 'getPhasesAmount',
    handler: (valRaw: BigNumberEthers[]) => phasesAmount.value = valRaw.map((amountRaw) => parseWei(amountRaw, 18)),
  },
  {
    name: 'getPhasesTime',
    handler: (valRaw: BigNumberEthers[]) => phasesTime.value = valRaw.map((timeRaw) => timeRaw.toNumber()),
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
    phasesMaxAmount,
    phasesAmount,
    phasesTime,
  }
}
