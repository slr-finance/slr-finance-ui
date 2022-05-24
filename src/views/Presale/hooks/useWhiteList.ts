import { Ref, ref, watch } from 'vue'
import { getPresaleContract } from '@/utils/contracts/getPresaleContract'
import { runAsyncWithParamChecking } from '@/hooks/runAsyncWithParamChecking'
import { useEthers } from '@/hooks/dapp/useEthers'

const contract = getPresaleContract()
const { address: userAddress } = useEthers()
const isJoined = ref(false)
const isFetching = ref(false)
const isInitalFetched = ref(false)

const fetch = async () => {
  isFetching.value = true

  try {
    await runAsyncWithParamChecking(userAddress, async (userAddressVal, { breakIfValueChanged, breakIfValueIsNil }) => {
      try {
        breakIfValueIsNil()
        breakIfValueChanged()
        isJoined.value = await contract.joined(userAddressVal)
        isInitalFetched.value = true
        breakIfValueChanged()
      } catch (error) {
        isJoined.value = false

        throw error
      }
    })
  } catch (error) {
    console.error('useWhiteList')
    console.error(error)
  } finally {
    isFetching.value = false
  }
}

watch(userAddress, () => fetch(), { immediate: true })

type UseWhiteListReturns = [() => Promise<void>, Ref<boolean>, Ref<boolean>]

export const useWhiteList = (): UseWhiteListReturns => {
  return [fetch, isJoined, isFetching]
}
