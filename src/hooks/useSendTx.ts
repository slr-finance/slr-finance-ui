import { calculateGasMargin } from '@/utils/contracts/calculateGasMargin'
import { MaybeRef } from '@vueuse/core'
import { Contract, ContractTransaction } from 'ethers'
import get from 'lodash.get'
import { computed, Ref, ref, unref } from 'vue'
import { useSingleToast } from './useSingleToast'

export enum TxStatus {
  NONE,
  WAITING_FOR_SIGNING,
  SENDING,
  WAITING_FOR_RECEIPT,
  SUCCESS,
  TX_ERROR,
}

export type TxState<S extends TxStatus> = {
  status: S
  hash: S extends TxStatus.SUCCESS ? string : S extends TxStatus.TX_ERROR ? string : null
  isWaitingForSigning: S extends TxStatus.WAITING_FOR_SIGNING ? true : false
  isSending: S extends TxStatus.SENDING ? true : false
  isWaitingForReceipt: S extends TxStatus.WAITING_FOR_RECEIPT ? true : false
  isSuccess: S extends TxStatus.SUCCESS ? true : false
  isTxError: S extends TxStatus.TX_ERROR ? true : false
}

type TxToastsText = {
  waitingSigning?: string
  pending?: string
}

type UseSendTxReturn = [() => Promise<void>, Ref<TxState<TxStatus>>]

export const useSendTx = (
  contract: MaybeRef<Contract>,
  method: MaybeRef<string>,
  params: MaybeRef<any[]> = [],
  options: MaybeRef<any> = {},
  toastsText?: MaybeRef<TxToastsText>,
): UseSendTxReturn => {
  const txToast = useSingleToast()
  const txHash = ref(null as string | null)
  const txStatus = ref(TxStatus.NONE)
  const txState = computed(() => {
    const txStatusValue = unref(txStatus)

    return {
      status: TxStatus.NONE as TxStatus,
      hash: unref(txHash),
      isWaitingForSigning: txStatusValue === TxStatus.WAITING_FOR_SIGNING,
      isSending: txStatusValue === TxStatus.SENDING,
      isWaitingForReceipt: txStatusValue === TxStatus.WAITING_FOR_RECEIPT,
      isSuccess: txStatusValue === TxStatus.SUCCESS,
      isTxError: txStatusValue === TxStatus.TX_ERROR,
    }
  })

  const send = async () => {
    const contractVal = unref(contract)
    const methodVal = unref(method)
    const paramsVal = unref(params)
    const toastsTextVal = unref(toastsText)
    const optionsVal = unref(options)

    try {
      txHash.value = null
      txStatus.value = TxStatus.WAITING_FOR_SIGNING

      txToast.info(get(toastsTextVal, 'waitingSigning', 'Confirm transaction in your wallet'), { timeout: false })

      const estimateGas = await contractVal.estimateGas[methodVal](...paramsVal, optionsVal)
      const tx: ContractTransaction = await contractVal[methodVal](...paramsVal, {
        ...optionsVal,
        gasLimit: calculateGasMargin(estimateGas),
      })

      txToast.info(get(toastsTextVal, 'pending', 'Pending transaction'), { timeout: false })

      txStatus.value = TxStatus.WAITING_FOR_RECEIPT

      const txReceipt = await tx.wait()

      txStatus.value = TxStatus.SUCCESS
      txHash.value = txReceipt.transactionHash

      txToast.info(`Success transaction\n${`https://bscscan.com/tx/${txReceipt.transactionHash}`}`, {
        timeout: 2000,
        onClick: () => window.open(`https://bscscan.com/tx/${txReceipt.transactionHash}`),
      })
    } catch (error) {
      const errorMessage = get(
        error,
        ['data', 'message'],
        get(error, ['data'], 'Something wrong. Transaction not success.'),
      )

      txToast.error(errorMessage, { timeout: 8000 })

      console.error(errorMessage, error)
      console.error('Faild tx:', methodVal, paramsVal, optionsVal)

      txStatus.value = TxStatus.TX_ERROR
    }
  }

  return [send, txState]
}
