import BigNumber from 'bignumber.js'
import { BigNumber as BigNumberEthers } from 'ethers'

export type SerializedBigNumber = string

export const BIG_ZERO = new BigNumber(0)
export const BIG_ONE = new BigNumber(1)
export const BIG_NINE = new BigNumber(9)
export const BIG_TEN = new BigNumber(10)

export const ethersToSerializedBigNumber = (ethersBn: BigNumberEthers): SerializedBigNumber =>
  ethersToBigNumber(ethersBn).toJSON()

export const ethersToBigNumber = (ethersBn: BigNumberEthers): BigNumber => new BigNumber(ethersBn.toString())

/**
 * Returns the value of a ten taken to a specified power.
 * @param exponent The exponent value of the expression.
 */
export const bigTenPow = (exponent: number): BigNumber => BIG_TEN.pow(exponent)

export const weiToBig = (value: BigNumber, decimals: number) => value.div(bigTenPow(decimals))

export const bigToWei = (value: BigNumber, decimals: number) => value.times(bigTenPow(decimals))

export const parseWei = (wei: BigNumberEthers, decimals: number) => weiToBig(ethersToBigNumber(wei), decimals)
