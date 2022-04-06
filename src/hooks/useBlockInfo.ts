import { ref } from 'vue'
import { multicall } from '@/utils/contracts/multicall'
import MulticallAbi from '@/config/abi/Multicall.json'
import contractsAddresses from '@/config/constants/contractsAddresses.json'

const blockTimestamp = ref(0)
const blockNumber = ref(0)

const loopBlock = async () => {
  try {
    const [[[blockTimestampRaw]], blockNumberRaw] = await multicall(MulticallAbi, [
      { name: 'getCurrentBlockTimestamp', address: contractsAddresses.Multicall },
    ])

    blockNumber.value = blockNumberRaw.toNumber()
    blockTimestamp.value = blockTimestampRaw.toNumber()
  } catch (error) {
    console.error(error)
  } finally {
    setTimeout(() => loopBlock(), 5000)
  }
}

loopBlock()

export const useBlockInfo = () => {
  return { blockTimestamp, blockNumber }
}
