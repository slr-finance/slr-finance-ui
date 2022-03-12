import { getContract } from './getContract'
import MulticallAbi from '@/config/abi/Multicall.json'

export const getMulticallContract = () => getContract('0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C', MulticallAbi)
