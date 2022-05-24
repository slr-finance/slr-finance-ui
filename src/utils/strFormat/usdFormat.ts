import BigNumber from 'bignumber.js'
import { findDigits } from './helpers'
import { numberFormat } from './numberFormat'

const fractionDigits = [
  { maxVal: 0.01, digits: 6 },
  { maxVal: 0.5, digits: 4 },
  { maxVal: 10000, digits: 2 },
  { maxVal: Number.POSITIVE_INFINITY, digits: 0 },
]

const minDispaly = 0.000001
const minDispalyStr = `> ${minDispaly.toLocaleString('en-En', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 6,
})}`

export const usdFormat = (amount: BigNumber | number) => {
  if (BigNumber.isBigNumber(amount)) {
    if (amount.lt(minDispaly) && !amount.eq(0)) {
      return minDispalyStr
    }
  } else {
    if (amount < minDispaly && amount !== 0) {
      return minDispalyStr
    }
  }

  return numberFormat(amount, {
    maximumFractionDigits: findDigits(fractionDigits, amount),
    style: 'currency',
    currency: 'USD',
  })
}
