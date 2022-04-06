import { BigNumber as BigNumberEthers, ethers } from 'ethers'
import { getMulticallContract } from '@/utils/contracts/getMulticallContract'
import { Result } from 'ethers/lib/utils'

export type MultiCallResponse<T> = T | null

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  requireSuccess?: boolean
}

interface AggregateRaw extends Result {
  blockNumber: BigNumberEthers
  returnData: string[]
}

interface TryAggregateRaw extends Result {
  result: boolean
  data: string
}
;[]

export const multicall = async <T extends Array<any>>(abi: any[], calls: Call[]): Promise<[T, BigNumberEthers]> => {
  try {
    const multi = getMulticallContract()
    const itf = new ethers.utils.Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData, blockNumber } = (await multi.functions.aggregate(calldata)) as AggregateRaw
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call)) as T

    return [res, blockNumber]
  } catch (error) {
    throw new Error(error as any)
  }
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const multicallv2 = async <T extends Result = any>(
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
): Promise<MultiCallResponse<T>[]> => {
  const { requireSuccess } = options
  const multi = getMulticallContract()
  const itf = new ethers.utils.Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const returnData = (await multi.tryAggregate(requireSuccess, calldata)) as TryAggregateRaw
  const res = returnData.map((call, i): MultiCallResponse<T> => {
    const [result, data] = call

    return result ? (itf.decodeFunctionResult(calls[i].name, data) as T) : null
  })

  return res
}
