import type { Signer } from '@ethersproject/abstract-signer'
import { getContract } from './getContract'
import erc20Abi from '@/config/abi/Erc20.json'

export const getErc20Contract = (tokenAddress: string, signer?: Signer | null) =>
  getContract(tokenAddress, erc20Abi, signer)
