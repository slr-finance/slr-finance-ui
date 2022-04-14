import BigNumber from 'bignumber.js'
import get from 'lodash.get'

export type FractionDigitsOption = {
  maxVal: number
  digits: number
}

export const getDigits = (option?: FractionDigitsOption) => {
  return get(option, 'digits', 0)
}

export const findDigits = (fractionDigits: FractionDigitsOption[], amount: BigNumber | number) => {
  if (BigNumber.isBigNumber(amount)) {
    return getDigits(fractionDigits.find(({ maxVal }) => amount.lt(maxVal)))
  } else {
    return getDigits(fractionDigits.find(({ maxVal }) => amount < maxVal))
  }
}
