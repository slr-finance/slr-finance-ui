import { isAddress } from 'ethers/lib/utils'

export function shortenAddress(address: string, num = 4): string {
  if (isAddress(address)) {
    return address.slice(0, num + 2) + '…' + address.slice(-num)
  } else {
    return ''
  }
}
