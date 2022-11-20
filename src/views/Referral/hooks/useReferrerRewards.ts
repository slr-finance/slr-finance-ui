import { Ref, ref } from 'vue'
import BigNumber from 'bignumber.js'
import { BIG_ZERO, parseWei } from '@/utils/bigNumber'
import { createSharedComposable, watchTriggerable } from '@vueuse/core'
import { useReferralContract } from '@/hooks/contracts/useReferralContract'
import { StopController } from '@/utils/StopController'

export const useReferrerRewards = createSharedComposable(() => {
  const isFetching = ref(false)
  const reward = ref(new BigNumber(0)) as Ref<BigNumber>
  const rewarded = ref(new BigNumber(0)) as Ref<BigNumber>
  const referralContract = useReferralContract()

  const resetState = () => {
    reward.value = BIG_ZERO
    rewarded.value = BIG_ZERO
    isFetching.value = false
  }

  const { trigger: refetchRewards } = watchTriggerable(
    referralContract,
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
        const referrerReward = await contract.referrersRewards(signerAddress)

        stopController.breakIfStoping()

        reward.value = parseWei(referrerReward.reward, 18)
        rewarded.value = parseWei(referrerReward.rewarded, 18)
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

  return { reward, rewarded, isFetching, refetchRewards }
})
