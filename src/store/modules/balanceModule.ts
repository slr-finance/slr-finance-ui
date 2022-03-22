import { FetchingStatus } from '@/entities/common'
import BigNumber from 'bignumber.js'
import { BigNumber as BigNumberEthers } from 'ethers'
import get from 'lodash.get'
import { createModule } from 'vuexok'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { parseWei } from '@/utils/bigNumber'

export type TokenInfo = {
  decimals: number
  balanceRaw: BigNumberEthers
  balance: BigNumber
  address: string
  fetchStatus: FetchingStatus
}

const getDefaultTokenState = (tokenAddress: string): TokenInfo => ({
  decimals: 0,
  balanceRaw: BigNumberEthers.from(0),
  balance: new BigNumber(0),
  address: tokenAddress,
  fetchStatus: FetchingStatus.NONE,
})

export const balanceModule = createModule('balances', {
  namespaced: true,
  state: {
    balances: {} as Record<string, TokenInfo>,
  },
  mutations: {
    reset(state) {
      state.balances = {}
    },
    fetchingBalance(state, tokenAddress: string) {
      state.balances[tokenAddress] = {
        decimals: 0,
        balanceRaw: BigNumberEthers.from(0),
        balance: new BigNumber(0),
        address: tokenAddress,
        fetchStatus: FetchingStatus.FETCHING,
      }
    },
    fetchedBalance(state, payload: { tokenAddress: string; balanceRaw: BigNumberEthers; decimals: number }) {
      state.balances[payload.tokenAddress] = {
        decimals: payload.decimals,
        balanceRaw: payload.balanceRaw,
        balance: parseWei(payload.balanceRaw, payload.decimals),
        address: payload.tokenAddress,
        fetchStatus: FetchingStatus.FETCHED,
      }
    },
    errorBalance(state, tokenAddress: string) {
      state.balances[tokenAddress] = {
        decimals: 0,
        balanceRaw: BigNumberEthers.from(0),
        balance: new BigNumber(0),
        address: tokenAddress,
        fetchStatus: FetchingStatus.ERROR,
      }
    },
  },
  getters: {
    getFetchingStatus(state): (tokenAddress: string) => FetchingStatus {
      return (tokenAddress: string) => get(state.balances, [tokenAddress, 'fetchStatus'], FetchingStatus.NONE)
    },
    getBalance(state): (tokenAddress: string) => BigNumber {
      return (tokenAddress: string) => get(state.balances, [tokenAddress, 'balance'], new BigNumber(0))
    },
    getSlrBalance(state) {
      return get(state.balances, [contractsAddresses.SolarToken, 'balance'], new BigNumber(0))
    },
    getBalanceRaw(state): (tokenAddress: string) => BigNumberEthers {
      return (tokenAddress: string) => get(state.balances, [tokenAddress, 'balanceRaw'], BigNumberEthers.from(0))
    },
    getTokenInfo(state): (tokenAddress: string) => TokenInfo {
      return (tokenAddress: string) => get(state.balances, tokenAddress, getDefaultTokenState(tokenAddress))
    },
  },
})
