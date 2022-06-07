import { Call } from '@/utils/contracts/multicall'
import { percentFormat } from '@/utils/strFormat/percentFormat'
import { ref } from 'vue'

const percentRewards = ref({
  sellRewardStr: '',
  buyRewardStr: '',
  transferRewardStr: '',
  stakingRewardStr: '',
  presaleRewardStr: '',
})

const fetchReferrerPercentRewards = async () => {
  const sellReward = 0.05
  const buyReward = 0.15
  const transferReward = 0.1
  const stakingReward = 0.1
  const presaleReward = 0.01

  percentRewards.value = {
    sellRewardStr: percentFormat(sellReward),
    buyRewardStr: percentFormat(buyReward),
    transferRewardStr: percentFormat(transferReward),
    stakingRewardStr: percentFormat(stakingReward),
    presaleRewardStr: percentFormat(presaleReward),
  }
}

export const useReferrerPercentRewards = () => {
  fetchReferrerPercentRewards()

  return percentRewards
}
