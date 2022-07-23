export enum ChainId {
  Bnb = 56,
  Testnet = 97,
}

export const CHAIN_ID = import.meta.env.VITE_CHAIN !== 'TESTNET' ? ChainId.Bnb : ChainId.Testnet

export const CHAIN_NAMES = {
  [ChainId.Bnb]: 'BNB',
  [ChainId.Testnet]: 'Testnet BNB',
}

export const NETWORK_DETAILS = {
  [ChainId.Bnb]: {
    chainId: '0x' + ChainId.Bnb.toString(16),
    chainName: 'BNB',
    nativeCurrency: {
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  [ChainId.Testnet]: {
    chainId: '0x' + ChainId.Testnet.toString(16),
    chainName: 'Testnet BNB',
    nativeCurrency: {
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
}
