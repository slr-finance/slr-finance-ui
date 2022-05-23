import BigNumber from 'bignumber.js'

export const numberFormat = (value: BigNumber | number, options: Intl.NumberFormatOptions = {}) => {
  if (BigNumber.isBigNumber(value)) {
    return value.toNumber().toLocaleString('en-En', options)
  }

  return value.toLocaleString('en-En', options)
}
