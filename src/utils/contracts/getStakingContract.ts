import type { Signer } from '@ethersproject/abstract-signer'
import { getContract } from './getContract'
import stakingAbi from '@/config/abi/Staking.json'
import contractsAddresses from '@/config/constants/contractsAddresses.json'

export const getStakingContract = (signer?: Signer | null) => {
  const contract = getContract(contractsAddresses.StakingService, stakingAbi, signer)

  return contract
}
