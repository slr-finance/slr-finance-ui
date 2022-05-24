import type { Signer } from '@ethersproject/abstract-signer'
import { getContract } from './getContract'
import PresaleAbi from '@/config/abi/Presale.json'
import contractsAddresses from '@/config/constants/contractsAddresses'

export const getPresaleContract = (signer?: Signer | null) => {
  const contract = getContract(contractsAddresses.PresaleService, PresaleAbi, signer)

  return contract
}
