import { Ref, ref, watch } from 'vue'
import { useEthers } from 'vue-dapp'
import { getReferralContract } from '@/utils/contracts/getReferralContract'
import { BigNumber as BigNumberEthers } from 'ethers'
import BigNumber from 'bignumber.js'
import { runAsyncWithParamChecking } from '@/hooks/runAsyncWithParamChecking'
import { parseWei } from '@/utils/bigNumber'

type ReferrerRewardRaw = {
  reward: BigNumberEthers
  rewarded: BigNumberEthers
}

export const useReferrerRewards = () => {
  const { address } = useEthers()
  const isFetching = ref(false)
  const reward = ref(new BigNumber(0)) as Ref<BigNumber>
  const rewarded = ref(new BigNumber(0)) as Ref<BigNumber>

  const handleFetchReward = async () => {
    await runAsyncWithParamChecking(
      address,
      async (addressVal, { breakIfValueChanged, breakIfValueIsNil, isNilValue }) => {
        isFetching.value = !isNilValue()
        reward.value = new BigNumber(0)
        rewarded.value = new BigNumber(0)

        breakIfValueIsNil()

        const referrerReward: ReferrerRewardRaw = await getReferralContract().referrersRewards(addressVal)

        breakIfValueChanged()

        reward.value = parseWei(referrerReward.reward, 18)
        rewarded.value = parseWei(referrerReward.rewarded, 18)
        isFetching.value = false
      },
    )
  }

  watch(address, () => handleFetchReward(), { immediate: true })

  return { reward, rewarded, isFetching, refetchRewards: handleFetchReward }
}
