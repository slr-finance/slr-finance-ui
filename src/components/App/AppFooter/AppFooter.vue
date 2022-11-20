<template>
  <ui-footer
    :links="links"
  >
    <ui-footer-token-widget
      :action="{ to: { name: 'swap' } }"
      @wallet-click="handleWalletClick"
    />
  </ui-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UiFooter, UiFooterTokenWidget } from '@slr-finance/uikit'

const links = [
  {
    label: 'About',
    items: [
      {
        text: 'first',
        href: '#',
      },
      {
        text: 'second',
        href: '#',
      },
    ],
  },
  {
    label: 'Features',
    items: [
      {
        text: 'first',
        href: '#',
      },
      {
        text: 'second',
        href: '#',
      },
    ],
  },
  {
    label: 'Extra',
    items: [
      {
        text: 'first',
        href: '#',
      },
      {
        text: 'second',
        href: '#',
      },
    ],
  },
]

export default defineComponent({
  name: 'app-footer',
  setup() {
    const handleWalletClick = () => {
      alert()
    }

    return { links, handleWalletClick }
  },
  components: {
    UiFooter,
    UiFooterTokenWidget,
  }
})
</script>
