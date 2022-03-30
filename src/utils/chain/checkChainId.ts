import { ChainId } from '@/config/constants/chain'

export function checkChainId(chainId: number) {
  if (chainId in ChainId) {
    return true
  }
  return false
}
