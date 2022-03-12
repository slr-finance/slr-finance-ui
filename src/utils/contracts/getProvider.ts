import { JsonRpcProvider } from '@ethersproject/providers'

const provider = new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/', { chainId: 97, name: 'bnbt' })

export const getProvider = () => {
  // return new JsonRpcProvider('https://bsc-dataseed.binance.org')
  return provider
}
