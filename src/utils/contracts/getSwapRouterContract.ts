import type { Signer } from '@ethersproject/abstract-signer'
import { getContract } from './getContract'
import SwapRouterAbi from '@/config/abi/SwapRouter.json'
import contractsAddresses from '@/config/constants/contractsAddresses'

export const getSwapRouterContract = (signer?: Signer | null) => {
  const contract = getContract(contractsAddresses.SwapRouter, SwapRouterAbi, signer)

  return contract
}
