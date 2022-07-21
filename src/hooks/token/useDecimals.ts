import { MaybeRef } from '@vueuse/core'
import { isAddress } from 'ethers/lib/utils'
import { Ref, ref, unref, watch } from 'vue'
import { useErc20Contract } from '@/hooks/contracts/useErc20Contract'

export type UseDecimalsReturns = [Ref<number>, Ref<boolean>]

export const useDecimals = (tokenAddress: MaybeRef<string>): UseDecimalsReturns => {
  const decimal = ref(0)
  const isFetching = ref(false)
  const tokenContract = useErc20Contract(tokenAddress)

  const fetchDecimal = async () => {
    try {
      const tokenAddressVal = unref(tokenAddress)

      if (!isAddress(tokenAddressVal)) {
        if (tokenAddressVal) {
          throw new Error()
        } else {
          isFetching.value = false
          decimal.value = 0

          return
        }
      }

      isFetching.value = false
      decimal.value = 0

      const [responce] = await tokenContract.value.functions.decimals()

      decimal.value = responce
    } catch (error) {
      throw error
    } finally {
      isFetching.value = false
    }
  }

  watch(() => tokenAddress, fetchDecimal, { immediate: true })

  return [decimal, isFetching]
}
