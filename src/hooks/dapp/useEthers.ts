import { computed, markRaw, ref, unref, Ref } from 'vue'
import { Web3Provider, Network, ExternalProvider } from '@ethersproject/providers'
import { Signer } from 'ethers'
import { WalletProvider } from './useWallet'
import BigNumber from 'bignumber.js'
import { parseWei } from '@/utils/bigNumber'
import { createSharedComposable } from '@vueuse/core'

export type { Web3Provider, Signer, Network }

export const useEthers = createSharedComposable(() => {
  const isActivated = ref(false)
  const provider = ref<Web3Provider | null>(null)
  const signer = ref<Signer | null>(null)
  const network = ref<Network | null>(null)
  const address = ref('')
  const balance = ref(markRaw(new BigNumber(0))) as Ref<BigNumber>

  const deactivate = () => {
    isActivated.value = false
    provider.value = null
    signer.value = null
    network.value = null
    address.value = ''
    balance.value = markRaw(new BigNumber(0))
  }

  async function activate(walletProvider: WalletProvider) {
    if (!walletProvider) throw new Error('Failed to activate: missing provider')

    const _provider = new Web3Provider(walletProvider as ExternalProvider)
    const _signer = _provider.getSigner()
    const _network = await _provider.getNetwork()
    const _address = await _signer.getAddress()
    const _balance = await _signer.getBalance()

    provider.value = markRaw(_provider)
    signer.value = markRaw(_signer)
    network.value = _network
    address.value = _address
    balance.value = parseWei(_balance, 18)

    isActivated.value = true
  }

  const chainId = computed(() => network.value?.chainId)

  const fetchBalance = async () => {
    const signerVal = unref(signer)

    if (!signerVal) {
      return
    }

    const _balance = await signerVal.getBalance()
    balance.value = parseWei(_balance, 18)
  }

  return {
    // state
    isActivated,
    provider: provider as Ref<Web3Provider | null>, // for fixing index.d.ts compiled error, see issue/10:
    signer: signer as Ref<Signer | null>,
    network,
    address,
    balance,
    fetchBalance,

    // getters
    chainId,

    // methods
    activate,
    deactivate,
  }
})
