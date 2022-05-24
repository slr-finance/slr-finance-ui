import BigNumber from 'bignumber.js'
import { numberFormat } from './numberFormat'

export const percentFormat = (fraction: BigNumber | number) => {
  let percent:number

  if (BigNumber.isBigNumber(fraction)) {
    percent = fraction.times(100).toNumber()
  } else {
    percent = fraction * 100
  }

  const percentStr = numberFormat(percent, {
    style: 'decimal',
    maximumFractionDigits: 2,
  })

  return `${percentStr}%`
}
