import contractsAddresses from '@/config/constants/contractsAddresses'
import { Multicall__factory } from '@/contracts'
import { getProvider } from './getProvider'

export const getMulticallContract = () => Multicall__factory.connect(contractsAddresses.Multicall, getProvider())
