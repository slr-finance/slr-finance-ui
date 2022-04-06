import { getContract } from './getContract'
import MulticallAbi from '@/config/abi/Multicall.json'
import contractsAddresses from '@/config/constants/contractsAddresses.json'

export const getMulticallContract = () => getContract(contractsAddresses.Multicall, MulticallAbi)
