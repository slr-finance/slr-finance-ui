import { BigNumber } from 'bignumber.js'

export const getApy = (apr: BigNumber, days = 365): BigNumber => {
  return apr.div(365).plus(1).pow(days).minus(1)
}
