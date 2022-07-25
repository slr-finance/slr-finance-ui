import { ref } from 'vue'
import { Multicall__factory } from '@slr-finance/contracts'
import { multicall } from '@/utils/contracts/multicall'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useInterval } from '@vueuse/core'

const blockTimestampSync = ref(0)
const blockTimestamp = useInterval(1000)
const blockNumber = ref(0)

const loopBlock = async () => {
  try {
    const [[[blockTimestampRaw]], blockNumberRaw] = await multicall(Multicall__factory.abi, [
      { name: 'getCurrentBlockTimestamp', address: contractsAddresses.Multicall },
    ])

    const fetchedBlockTimestamp = blockTimestampRaw.toNumber()

    blockNumber.value = blockNumberRaw.toNumber()
    blockTimestampSync.value = fetchedBlockTimestamp
    blockTimestamp.value = fetchedBlockTimestamp
  } catch (error) {
    console.error(error)
  } finally {
    setTimeout(() => loopBlock(), 5000)
  }
}

loopBlock()

export const useBlockInfo = () => {
  return { blockTimestampSync, blockTimestamp, blockNumber }
}
