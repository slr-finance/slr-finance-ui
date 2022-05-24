import type { Signer } from '@ethersproject/abstract-signer'
import { getContract } from './getContract'
import ReferralAbi from '@/config/abi/Referral.json'
import contractsAddresses from '@/config/constants/contractsAddresses'

export const getReferralContract = (signer?: Signer | null) => {
  const contract = getContract(contractsAddresses.ReferralService, ReferralAbi, signer)

  return contract
}
