<template>
  <ui-button
    :href="walletInfo.link"
    size="48"
  >
    <ui-icon
      prefix="icon-wallets"
      size="18"
      :name="walletInfo.iconName"
    />
    {{ wallet }}
  </ui-button>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import UiButton from '@/components/ui/UiButton.vue'

  const walletDeepLinkInfo = {
    metamask: {
      prefix: 'https://metamask.app.link/wc?uri=',
      iconName: 'metamask',
    },
    trustwallet: {
      prefix: 'https://link.trustwallet.com/wc?uri=',
      iconName: 'trustwallet',
    },
  }

  export default defineComponent({
    name: 'walletconnect-mobile-deep-link',
    props: {
      wallet: {
        type: String as PropType<keyof typeof walletDeepLinkInfo>,
        required: true,
      },
      uri: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const walletInfo = computed(() => ({
        link: `${walletDeepLinkInfo[props.wallet].prefix}${props.uri}`,
        iconName: walletDeepLinkInfo[props.wallet].iconName,
      }))

      return {
        walletInfo,
      }
    },
    components: {
      UiIcon,
      UiButton,
    },
  })
</script>
