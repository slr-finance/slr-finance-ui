import { HOME_DOMAIN, SHORT_IO_API_KEY } from '@/config/constants/main'
import { REFERRER_QUERY_PARAM } from '@slr-finance/ui-share'
import { useEthers } from '@/hooks/dapp/useEthers'
import { isAddress } from '@ethersproject/address'
import { computed, ref, watch } from 'vue'

const getLocalestorageKey = (address: string) => `ref-link:${address}`

export const useReferralLink = (domain = HOME_DOMAIN) => {
  const { address } = useEthers()

  const result = ref({
    fetched: false,
    isValid: false,
    short: null as null | string,
    full: null as null | string,
  })

  const referralLink = computed(() => {
    const addressVal = address.value

    return {
      link: `https://${domain}?${REFERRER_QUERY_PARAM}=${addressVal}`,
      address: addressVal,
    }
  })

  watch(
    referralLink,
    async ({ link, address }, _, onCleanup) => {
      if (!isAddress(address)) {
        result.value = {
          isValid: false,
          short: null,
          full: null,
          fetched: false,
        }
      } else {
        const localstorageKey = getLocalestorageKey(address)
        const savedShortLink = window.localStorage.getItem(localstorageKey)

        if (savedShortLink) {
          result.value = {
            isValid: true,
            short: savedShortLink,
            full: link,
            fetched: true,
          }
        } else {
          result.value = {
            isValid: true,
            short: null,
            full: link,
            fetched: false,
          }

          const abortController = new AbortController()

          onCleanup(() => abortController.abort())

          try {
            const response = await fetch('https://api.short.io/links/public', {
              headers: {
                authorization: SHORT_IO_API_KEY,
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
              // credentials: 'include',
              // cache: 'no-cache',
              body: JSON.stringify({
                originalURL: link,
                domain: 'go.slr.finance',
              }),
              keepalive: false,
              method: 'POST',
              referrerPolicy: 'no-referrer',
              signal: abortController.signal,
            })

            const responseBody = await response.json()
            const secureShortURL: string = responseBody.secureShortURL

            window.localStorage.setItem(getLocalestorageKey(address), secureShortURL)

            result.value = {
              isValid: true,
              short: secureShortURL,
              full: link,
              fetched: true,
            }
          } catch (error) {
            result.value = {
              isValid: true,
              short: null,
              full: link,
              fetched: true,
            }

            console.error(error)
          }
        }
      }
    },
    { immediate: true },
  )

  return result
}
