declare global {
  interface Window {
    util?: any
  }
}

let isInited = false

const initWalletConnectDependencies = async () => {
  if (isInited) {
    return
  }

  const [process, buffer] = await Promise.all([import('process'), import('buffer')])
  window.global = window
  window.process = process
  window.Buffer = buffer.Buffer

  const util = await import('util')

  window.util = util

  isInited = true
}

export const loadWalletConnect = async () => {
  await initWalletConnectDependencies()

  const Walletconnect = await import('./Walletconnect')

  return Walletconnect
}
