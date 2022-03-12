import { BigNumber } from 'bignumber.js'

export const getApy = (apr: BigNumber, times = 365): BigNumber => {
  return apr.div(365).plus(1).pow(times).minus(1)
}
