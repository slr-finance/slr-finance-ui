import { BigNumber as BigNumberEthers } from 'ethers'

const TEN_THOUSAND_BN_ETHERS = BigNumberEthers.from(10000)
const ONE_THOUSAND_BN_ETHERS = BigNumberEthers.from(2000)

// add 20%
export const calculateGasMargin = (value: BigNumberEthers): BigNumberEthers =>
  value.mul(TEN_THOUSAND_BN_ETHERS.add(ONE_THOUSAND_BN_ETHERS)).div(TEN_THOUSAND_BN_ETHERS)
