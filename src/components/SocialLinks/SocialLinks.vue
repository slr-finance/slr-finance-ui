<template>
  <div class="flex items-center space-x-12">
    <a
      :href="links.twitter"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ui-icon
        name="twitter"
        prefix="ui-icon-social"
        size="20"
      />
    </a>
    <a
      :href="links.fb"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ui-icon
        name="facebook"
        prefix="ui-icon-social"
        size="20"
      />
    </a>
    <a
      :href="links.tg"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ui-icon
        name="instagram"
        prefix="ui-icon-social"
        size="20"
      />
    </a>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import UiIcon from '@/components/ui/UiIcon'

  export default defineComponent({
    name: '',
    props: {
      text: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      hashtags: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
    },
    setup(props) {
      const links = computed(() => ({
        twitter: `http://twitter.com/share?text=${props.text}&url=${props.link}&hashtags=${props.hashtags.join(',')}`,
        tg: `https://t.me/share/url?url=${props.link}&text=${props.text}`,
        fb: `https://www.facebook.com/sharer.php?caption=caption&description=${props.text}&u=${props.link}`,
      }))

      return { links }
    },
    components: { UiIcon },
  })
</script>
