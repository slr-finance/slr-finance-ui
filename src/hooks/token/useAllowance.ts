import { Ref, ref } from 'vue'
import { MaybeRef, watchTriggerable } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { ERC20__factory } from '@slr-finance/contracts'
import { useEthers } from '@/hooks/dapp/useEthers'
import { Call, multicall } from '@/utils/contracts/multicall'
import { BIG_ZERO, parseWei } from '@/utils/bigNumber'
import { StopController } from '@/utils/StopController'

type UseAllowanceReturn = [() => Promise<void>, Ref<BigNumber>, Ref<boolean>]

export const useAllowance = (tokenAddress: MaybeRef<string>, spender: MaybeRef<string>): UseAllowanceReturn => {
  const { address: userAddress } = useEthers()
  const isFetching = ref(false)
  const allowance = ref(new BigNumber(0)) as Ref<BigNumber>

  const resetState = () => {
    allowance.value = BIG_ZERO
    isFetching.value = false
  }

  const { trigger: fetchAllowance } = watchTriggerable(
    [tokenAddress, userAddress, spender],
    async ([tokenAddressVal, userAddressVal, spenderVal], _, onCleanup) => {
      try {
        resetState()
        const stopController = new StopController(onCleanup)

        if (!userAddressVal || !tokenAddressVal) {
          stopController.stop()
        }

        stopController.breakIfStoping()

        isFetching.value = true

        const calls: Call[] = [
          {
            // В watchTriggerable не правильные типы, ждем фикса. После фикса можно будет убрать as string
            address: tokenAddressVal as string,
            name: 'decimals',
          },
          {
            // В watchTriggerable не правильные типы, ждем фикса. После фикса можно будет убрать as string
            address: tokenAddressVal as string,
            name: 'allowance',
            params: [userAddressVal, spenderVal],
          },
        ]

        const [[[decimalsResponse], [allowanceResponse]]] = await multicall(ERC20__factory.abi, calls)

        stopController.breakIfStoping()

        allowance.value = parseWei(allowanceResponse, decimalsResponse)

        isFetching.value = false
      } catch (error) {
        resetState()

        if (!StopController.isStoped(error)) {
          throw error
        }
      }
    },
    { immediate: true },
  )

  return [fetchAllowance, allowance, isFetching]
}
