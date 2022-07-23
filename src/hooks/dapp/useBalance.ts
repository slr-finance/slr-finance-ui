import { Call, multicall } from '@/utils/contracts/multicall'
import { createSharedComposable, MaybeRef, watchTriggerable } from '@vueuse/core'
import { computed, readonly, ref, Ref, unref } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'
import { Erc20__factory } from '@/contracts'
import { BIG_ZERO, parseWei } from '@/utils/bigNumber'
import BigNumber from 'bignumber.js'

// export type TokenInfo = {
//   decimals: number
//   balanceRaw: BigNumberEthers
//   balance: BigNumber
//   address: string
//   isFetching: boolean
// }


// const balances = new Map<StringTokenAddress, TokenInfo>()

// const state = {
//   ownerAddress: '',
//   watchedTokens: [],
//   usingCounter: {} as Record<string, number>,
//   tokensData: new Map<StringTokenAddress, Ref<TokenInfo>>(),
//   subscribe(address:string) {
//     if (!this.usingCounter[address]) {
//       this.usingCounter[address] = 0

//       this.tokensData.set(address, ref())
//       this.fetch(address)
//     }

//     this.usingCounter[address] += 1

//     const tokenDataRef = this.tokensData.get(address)

//     if (!tokenDataRef) {
//       throw new Error()
//     }

//     return tokenDataRef
//   },
//   unsubscribe(address:string) {
//     if (this.usingCounter[address]) {
//       this.usingCounter[address] -= 1
      
//       if (this.usingCounter[address] <= 0) {
//         this.tokensData.delete(address)
//       }
//     }
//   },
//   getCalls(tokenAddress: string, userAddress: string) {
//     return [
//       {
//         name: 'decimals',
//         address: tokenAddress,
//       },
//       {
//         name: 'balanceOf',
//         address: tokenAddress,
//         params: [userAddress],
//       }
//     ]
//   },
//   async refFetchAll() {
//     const calls:Call[] = []
//     const fetchingList = [...this.watchedTokens]
    
//     fetchingList.forEach((tokenAddress) => {
//       const tokenData = this.tokensData.get(tokenAddress)

//       if (tokenData) {
//         tokenData.value.isFetching = true
//       }

//       calls.push(...this.getCalls(tokenAddress, this.ownerAddress))
//     })

//     const [[data]] = await multicall(Erc20__factory.abi, calls)

//     fetchingList.forEach((tokenAddress, index) => {
//       const decimals = data[index * 2][0]
//       const balanceRaw = data[(index * 2) + 1][0]

//       const tokenData = this.tokensData.get(tokenAddress)

//       if (tokenData) {
//         tokenData.value = {
//           decimals: decimals,
//           address: tokenAddress,
//           balanceRaw: balanceRaw,
//           balance: parseWei(balanceRaw, decimals),
//           isFetching: false,
//         }
//       }
//     })
//   }
// }

type StringTokenAddress = string

export const useBalance = (tokenAddress: MaybeRef<StringTokenAddress>) => {
  const balance = ref(BIG_ZERO)
  const decimals = ref(0)
  const isFetching = ref(false)
  const { address: userAddress } = useEthers()

  const calls = computed<Call[]>(() => [
    {
      name: 'decimals',
      address: unref(tokenAddress),
    },
    {
      name: 'balanceOf',
      address: unref(tokenAddress),
      params: [unref(userAddress)],
    },
  ])
  
  const { trigger: refetchBalance } = watchTriggerable(calls, async (callsArr) => {
    isFetching.value = true
    const [[[decimalsRaw], [balanceRaw]]] = await multicall(Erc20__factory.abi, callsArr)

    balance.value = parseWei(balanceRaw, decimalsRaw)
    decimals.value = decimalsRaw
    isFetching.value = false
  })

  return {
    balance: readonly(balance) as Readonly<Ref<BigNumber>>,
    decimals: readonly(decimals),
    isFetching: readonly(isFetching),
    refetchBalance,
  }
}
