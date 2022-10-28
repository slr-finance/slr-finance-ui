<template>
  <div class="rounded-12 border border-white border-opacity-20 h-48 pl-16 pr-6 flex items-center justify-between">
    <ui-text-placeholder
      :text="link"
      class="flex-1 truncate mr-32"
    />

    <button
      class="flex justify-center items-center rounded-10 bg-opacity-20 bg-violet min-w-40 w-40 h-40"
      @click="handleCopy"
    >
      <ui-icon-copy class="text-violet w-18 h-18"/>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useClipboard } from '@vueuse/core'
  import { UiTextPlaceholder, UiIconCopy } from '@slr-finance/uikit'  
  import { useUiToast } from '@/components/ui/UiToast'

  export default defineComponent({
    name: 'referral-link',
    props: {
      link: {
        type: [String, Object] as PropType<string | null>,
        required: true,
        validator: (val: string | null) => typeof val === 'string' || val === null,
      },
    },
    setup(props) {
      const { copy } = useClipboard()
      const { success, error } = useUiToast()

      const handleCopy = () => {
        if (props.link) {
          try {
            copy(props.link)
            success({ content: 'Referral link has been copied' })
          } catch (e) {
            error({ content: `Referral link has not been copied: ${e}` })
          }
        }
      }

      return { copy, handleCopy }
    },
    components: { UiIconCopy, UiTextPlaceholder },
  })
</script>
