import { Metamask, MetaMaskProvider, MetaMaskProviderRpcError } from '@/utils/wallet/Metamask'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { markRaw, ref, computed, Ref } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'
import { loadWalletConnect } from '@/utils/wallet/loadWalletConnect'
import { CHAIN_ID, NETWORK_DETAILS } from '@/config/constants/chain'
import { LATEST_CONNECTED_PROVIDER } from '@/config/constants/localStorage'

export type WalletName = 'none' | 'metamask' | 'walletconnect'
export type ConnectionState = 'none' | 'connecting' | 'connected'
export type WalletProvider = MetaMaskProvider | WalletConnectProvider

// State [BEGIN]
const provider = ref<WalletProvider | null>(null)
const status = ref<ConnectionState>('none')
const walletName = ref<WalletName>('none')
const error = ref('')
// State [END]

export const useWallet = () => {
  const { activate, deactivate } = useEthers()

  const clear = () => {
    provider.value = null
    status.value = 'none'
    walletName.value = 'none'
    error.value = ''

    deactivate()
  }

  const connect = async (name: WalletName, options?: any) => {
    let _provider: WalletProvider | null = null

    error.value = ''

    try {
      status.value = 'connecting'
      switch (name) {
        case 'metamask': {
          _provider = (await Metamask.connect()) as MetaMaskProvider

          if (!_provider.isConnected) {
            throw new Error('metamask is not connected')
          }
          break
        }
        case 'walletconnect': {
          const { Walletconnect } = await loadWalletConnect()
          _provider = (await Walletconnect.connect(options)) as WalletConnectProvider

          if (!_provider.connected) {
            throw new Error('walletconnect is not connected')
          }

          break
        }
        default: {
          throw new Error('Connect Error: wallet name not found')
        }
      }
    } catch (err: any) {
      clear()
      error.value = `Failed to connect: ${err.message}`
      throw err
    }

    provider.value = markRaw(_provider)
    walletName.value = name
    status.value = 'connected'

    localStorage.setItem(LATEST_CONNECTED_PROVIDER, name)

    const { chainId } = NETWORK_DETAILS[CHAIN_ID]

    if ((window.ethereum as any).chainId !== chainId) {
      await Metamask.switchChain(provider.value as MetaMaskProvider, CHAIN_ID)
    }

    // EIP-1193 subscriber
    subscribeDisconnect()
    subscribeAccountsChanged()
    subscribeChainChanged()

    try {
      await activate(provider.value as WalletProvider)
    } catch (err: any) {
      clear()
      error.value = `Failed to load data: ${err.message}`
      return
    }
  }

  const disconnect = async () => {
    // note: metamask can't disconnect by provider
    if (walletName.value === 'walletconnect') {
      try {
        await (provider.value as WalletConnectProvider).disconnect()
      } catch (err: any) {
        console.error(err.message)
      }
    }
    clear()
    localStorage.removeItem(LATEST_CONNECTED_PROVIDER)
  }

  // ========================= EIP-1193 subscriber =========================

  const subscribeDisconnect = () => {
    switch (walletName.value) {
      case 'metamask': {
        ;(provider.value as MetaMaskProvider).on('disconnect', (err: MetaMaskProviderRpcError) => {
          localStorage.removeItem(LATEST_CONNECTED_PROVIDER)
          clear()
        })

        break
      }

      case 'walletconnect': {
        // Q: why it trigger twice when user click disconnect?
        // source code: https://github.com/WalletConnect/walletconnect-monorepo/blob/0871582be273f8c21bb1351315d649ea47ee70b7/packages/providers/web3-provider/src/index.ts#L277
        ;(provider.value as WalletConnectProvider).on('disconnect', (code: number, reason: string) => {
          localStorage.removeItem(LATEST_CONNECTED_PROVIDER)
          clear()
        })
        break
      }
    }
  }

  const subscribeAccountsChanged = () => {
    switch (walletName.value) {
      case 'metamask': {
        ;(provider.value as MetaMaskProvider).on('accountsChanged', async (accounts: string[]) => {
          try {
            await activate(provider.value as WalletProvider)
          } catch (err: any) {
            error.value = `Failed when changing account: ${err.message}`
            return
          }
        })

        break
      }
      case 'walletconnect': {
        ;(provider.value as WalletConnectProvider).on('accountsChanged', async (accounts: string[]) => {
          try {
            await activate(provider.value as WalletProvider)
          } catch (err: any) {
            error.value = `Failed when changing account: ${err.message}`
            return
          }
        })

        break
      }
    }
  }

  const subscribeChainChanged = () => {
    switch (walletName.value) {
      case 'metamask': {
        ;(provider.value as MetaMaskProvider).on('chainChanged', async (hexChainId: string) => {
          const _provider = (await Metamask.connect()) as MetaMaskProvider
          provider.value = markRaw(_provider)
          // Changing network might lead to disconnect so the provider would be deleted.
          if (!provider.value) {
            error.value = 'Failed when changing chain: missing provider'
            console.error('Failed when changing chain: missing provider')
            return
          }

          const { chainId } = NETWORK_DETAILS[CHAIN_ID]

          if (hexChainId !== chainId) {
            await Metamask.switchChain(provider.value, CHAIN_ID)
          }

          try {
            await activate(provider.value as WalletProvider)
          } catch (err: any) {
            error.value = `Failed when changing chain: ${err.message}`
            return
          }
        })

        break
      }
      case 'walletconnect': {
        ;(provider.value as WalletConnectProvider).on('chainChanged', async (chainId: number) => {
          // Changing network might lead to disconnect so the provider would be deleted.
          if (!provider.value) {
            error.value = `Failed when changing chain: missing provider`
            return
          }

          try {
            await activate(provider.value as WalletProvider)
          } catch (err: any) {
            error.value = `Failed when changing chain: ${err.message}`
            return
          }
        })

        break
      }
    }
  }

  const isConnected = computed(() => {
    if (status.value === 'connected') return true
    else return false
  })

  return {
    connect,
    disconnect,
    isConnected,
    provider: provider as Ref<WalletProvider | null>,
    status,
    walletName,
    walletIconName: 'metamask',
    error,
  }
}
