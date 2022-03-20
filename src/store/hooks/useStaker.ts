import { computed, ComputedRef, watch } from 'vue'
import { StakerState, stakingModule } from '../modules/stakingModule'
import { store } from '../store'

type UseStakerReturns = [ComputedRef<StakerState>, () => Promise<void>]

export const useStaker = (): UseStakerReturns => {
  stakingModule.register(store)

  const stakerState = computed(() => stakingModule.state.staker)
  const refetchStaker = () => stakingModule.actions.refetchStaker()

  return [stakerState, refetchStaker]
}
