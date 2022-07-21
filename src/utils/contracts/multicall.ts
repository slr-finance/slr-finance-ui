import { BigNumber as BigNumberEthers, ethers } from 'ethers'
import { getMulticallContract } from '@/utils/contracts/getMulticallContract'
import { Result } from 'ethers/lib/utils'
import { Multicall } from '@/contracts'

export type MultiCallResponse<T> = T | null

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface AggregateRaw extends Result {
  blockNumber: BigNumberEthers
  returnData: string[]
}

export const multicall = async <T extends Array<any>>(abi: any[], calls: Call[]): Promise<[T, BigNumberEthers]> => {
  try {
    const multi = getMulticallContract()
    const itf = new ethers.utils.Interface(abi)

    const calldata: Multicall.CallStruct[] = calls.map((call) => ({
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params),
    }))
    const { returnData, blockNumber } = (await multi.functions.aggregate(calldata)) as AggregateRaw
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call)) as T

    return [res, blockNumber]
  } catch (error) {
    throw new Error(error as any)
  }
}
