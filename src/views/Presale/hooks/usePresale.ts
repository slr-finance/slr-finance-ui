import PresaleAbi from '@/config/abi/Presale.json'
import { Ref, ref, watch } from 'vue'
import { useEthers } from 'vue-dapp'
import { BigNumber as BigNumberEther, constants, ContractTransaction } from 'ethers'
import BigNumber from 'bignumber.js'
import { runAsyncWithParamChecking } from '@/hooks/runAsyncWithParamChecking'
import { getPresaleContract } from '@/utils/contracts/getPresaleContract'
import { Call, multicall } from '@/utils/contracts/multicall'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { isAddress, Result } from 'ethers/lib/utils'

type PresaleInfoRaw = [
  [number] & Result,
  [number] & Result,
  [BigNumberEther] & Result,
  [string] & Result,
  [BigNumberEther] & Result,
  [BigNumberEther] & Result,
  [BigNumberEther] & Result,
  [boolean] & Result,
  [boolean] & Result,
  ([BigNumberEther] & Result) | undefined,
  ([boolean] & Result) | undefined,
]

export type BuyPresaleTokenPayload = {
  amountIn: BigNumber
  amountOut: BigNumber
}

const TEN_BN = new BigNumber(10)

export const usePresale = () => {
  const { address, signer } = useEthers()
  const isFetching = ref(false)
  const tokenOutDecimals = ref(0)
  const tokenInDecimals = ref(0)
  const presaleTokenBalance = ref(new BigNumber(0)) as Ref<BigNumber>
  const isPresaleEnded = ref(false)
  const isWhiteListClosed = ref(false)
  const tokenPrice = ref(new BigNumber(0)) as Ref<BigNumber>
  const endPresaleBlock = ref(0)
  const endWhiteListBlock = ref(0)
  const tokenOutAddress = ref('')
  const totalSupply = ref(new BigNumber(0)) as Ref<BigNumber>
  const joined = ref(false)

  const handleFetchPresaleInfo = async () => {
    await runAsyncWithParamChecking(
      address,
      async (addressVal, { breakIfValueChanged, breakIfValueIsNil, isNilValue }) => {
        isFetching.value = !isNilValue()
        presaleTokenBalance.value = new BigNumber(0)
        isPresaleEnded.value = false
        isWhiteListClosed.value = false
        tokenPrice.value = new BigNumber(0)
        endPresaleBlock.value = 0
        endWhiteListBlock.value = 0
        tokenOutAddress.value = ''
        totalSupply.value = new BigNumber(0)
        joined.value = false

        let calls: Call[] = [
          {
            address: contractsAddresses.PresaleService,
            name: 'decimals',
          },
          {
            address: contractsAddresses.PresaleService,
            name: 'soldTokenDecimals',
          },
          {
            address: contractsAddresses.PresaleService,
            name: 'totalSupply',
          },
          {
            address: contractsAddresses.PresaleService,
            name: 'soldTokenAddress',
          },
          {
            address: contractsAddresses.PresaleService,
            name: 'endWhiteListBlock',
          },
          {
            address: contractsAddresses.PresaleService,
            name: 'endPresaleBlock',
          },
          {
            address: contractsAddresses.PresaleService,
            name: 'tokenPrice',
          },
          {
            address: contractsAddresses.PresaleService,
            name: 'isPresaleEnded',
          },
          {
            address: contractsAddresses.PresaleService,
            name: 'isWhiteListClosed',
          },
        ]

        if (!isNilValue()) {
          calls.push(
            {
              address: contractsAddresses.PresaleService,
              name: 'balanceOf',
              params: [addressVal],
            },
            {
              address: contractsAddresses.PresaleService,
              name: 'joined',
              params: [addressVal],
            },
          )
        }

        const [
          [tokenOutDecimalsVal],
          [tokenInDecimalsVal],
          [totalSupplyVal],
          [tokenOutAddressVal],
          [endWhiteListBlockVal],
          [endPresaleBlockVal],
          [tokenPriceVal],
          [isPresaleEndedVal],
          [isWhiteListClosedVal],
          [presaleTokenBalanceBn] = [],
          [joinedVal] = [],
        ] = await multicall<PresaleInfoRaw>(PresaleAbi, calls)

        tokenOutDecimals.value = tokenOutDecimalsVal
        tokenInDecimals.value = tokenInDecimalsVal
        totalSupply.value = new BigNumber(totalSupplyVal._hex).div(TEN_BN.pow(tokenOutDecimalsVal))
        tokenOutAddress.value = tokenOutAddressVal
        endWhiteListBlock.value = new BigNumber(endWhiteListBlockVal._hex).toNumber()
        endPresaleBlock.value = new BigNumber(endPresaleBlockVal._hex).toNumber()
        tokenPrice.value = new BigNumber(tokenPriceVal._hex).div(TEN_BN.pow(tokenInDecimalsVal))
        isPresaleEnded.value = isPresaleEndedVal
        isWhiteListClosed.value = isWhiteListClosedVal
        presaleTokenBalance.value = presaleTokenBalanceBn
          ? new BigNumber(presaleTokenBalanceBn._hex).div(TEN_BN.pow(tokenOutDecimalsVal))
          : new BigNumber(0)
        joined.value = joinedVal ? joinedVal : false

        breakIfValueChanged()

        isFetching.value = false
      },
    )
  }

  watch(address, async () => handleFetchPresaleInfo(), { immediate: true })

  const joinPresale = async () => {
    return await runAsyncWithParamChecking(signer, async (signerVal, { breakIfValueChanged }) => {
      if (!signerVal) {
        throw new Error('[useReferrerRewards:clameReward]: signer is null')
      }

      let referrer: string | null = localStorage.getItem('referrer')
      referrer = referrer && isAddress(referrer) ? referrer : constants.AddressZero

      const tx: ContractTransaction = await getPresaleContract(signerVal).functions.join(referrer)

      breakIfValueChanged()

      const receipt = await tx.wait(1)

      breakIfValueChanged()

      handleFetchPresaleInfo()

      return receipt.status
    })
  }

  return {
    isFetching,
    tokenOutDecimals,
    tokenInDecimals,
    presaleTokenBalance,
    isPresaleEnded,
    isWhiteListClosed,
    tokenPrice,
    endPresaleBlock,
    endWhiteListBlock,
    tokenOutAddress,
    totalSupply,
    joined,
    joinPresale,
  }
}
