import { ref } from 'vue'
import { multicall } from '@/utils/contracts/multicall'
import MulticallAbi from '@/config/abi/Multicall.json'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { useInterval } from '@vueuse/core'

const blockTimestampSync = ref(0)
const blockTimestamp = useInterval(1000)
const blockNumber = ref(0)

const loopBlock = async () => {
  try {
    const [[[blockTimestampRaw]], blockNumberRaw] = await multicall(MulticallAbi, [
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
