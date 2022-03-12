import { Contract, ContractInterface } from 'ethers'
import { Signer } from '@ethersproject/abstract-signer'
import { getProvider } from './getProvider'

export const getContract = (address: string, abi: ContractInterface, signer?: Signer | null) => {
  const constract = new Contract(address, abi, signer ?? getProvider())

  return constract
}
