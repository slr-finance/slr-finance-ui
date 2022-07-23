import { Ref, ref } from 'vue'
import { createSharedComposable, watchTriggerable } from '@vueuse/core'
import { usePresaleContract } from '@/hooks/contracts/usePresaleContract'
import { StopController } from '@/utils/StopController'

type UseWhiteListReturns = [() => Promise<void>, Ref<boolean>, Ref<boolean>]

export const useWhiteList = createSharedComposable((): UseWhiteListReturns => {
  const isJoined = ref(false)
  const isFetching = ref(false)
  const presaleContract = usePresaleContract()

  const resetState = () => {
    isJoined.value = false
    isFetching.value = false
  }

  const { trigger: fetch } = watchTriggerable(
    presaleContract,
    async (contract, _, onCleanup) => {
      try {
        resetState()
        const stopController = new StopController(onCleanup)
        const signerAddress = await contract?.signer?.getAddress()

        if (!signerAddress) {
          stopController.stop()
        }

        stopController.breakIfStoping()

        isFetching.value = true

        const [isJoinedValue] = await presaleContract.value.functions.joined(signerAddress)

        stopController.breakIfStoping()

        isJoined.value = isJoinedValue
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

  return [fetch, isJoined, isFetching]
})
