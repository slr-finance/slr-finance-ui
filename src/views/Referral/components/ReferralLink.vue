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
      <ui-icon
        class="text-violet"
        size="18"
        name="copy"
      />
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useClipboard } from '@vueuse/core'
  import { useSingleToast } from '@/hooks/useSingleToast'
  import UiIcon from '@/components/ui/UiIcon'
  import UiTextPlaceholder from '@/components/ui/UiTextPlaceholder.vue'

  export default defineComponent({
    name: 'referral-link',
    props: {
      link: {
        type: [String, Object] as PropType<string|null>,
        required: true,
        validator: (val:string|null) => typeof val === 'string' || val === null
      },
    },
    setup(props) {
      const { copy } = useClipboard()
      const { success, error } = useSingleToast()

      const handleCopy = () => {
        if (props.link) {
          try {
            copy(props.link)
            success('Referral link has been copied')
          } catch (e) {
            error(`Referral link has not been copied: ${e}`)
          }
        }
      }

      return { copy, handleCopy }
    },
    components: { UiIcon, UiTextPlaceholder },
  })
</script>
