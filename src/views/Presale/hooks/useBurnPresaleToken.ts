import { useSendTx } from '@/hooks/useSendTx'
import { usePresaleContract } from '@/hooks/contracts/usePresaleContract'

export const useBurnPresaleToken = () => {
  const presaleContract = usePresaleContract()

  return useSendTx(presaleContract, 'burnAll')
}
