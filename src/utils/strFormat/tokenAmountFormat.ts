import BigNumber from 'bignumber.js'
import { findDigits } from './helpers'
import { numberFormat } from './numberFormat'

const fractionDigits = [
  { maxVal: 1, digits: 6 },
  { maxVal: 10, digits: 4 },
  { maxVal: 1000, digits: 2 },
  { maxVal: Number.POSITIVE_INFINITY, digits: 0 },
]

export const tokenAmountFormat = (amount: BigNumber | number, symbol?: string) => {
  const amountStr = numberFormat(amount, {
    maximumFractionDigits: findDigits(fractionDigits, amount),
    style: 'decimal',
  })

  return `${amountStr}${symbol ? ` ${symbol}` : ''}`
}
