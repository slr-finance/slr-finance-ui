<template>
  <div class="w-full">
    <div class="text-12 text-white text-opacity-60 mb-12 leading-none">Channels</div>
    <social-item
      v-for="item in channels"
      :link="item.link"
      :label="item.label"
      :description="item.description"
      :icon-name="item.iconName"
      @click="handleClick"
    />

    <div class="text-12 text-white text-opacity-60 mt-28 mb-12 leading-none">Chats</div>
    <social-item
      v-for="item in chats"
      :link="item.link"
      :label="item.label"
      :description="item.description"
      :icon-name="item.iconName"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SocialItem from './SocialItem.vue'

  const telegramChannels = [
    {
      link: '',
      label: 'Official channel',
      description: 'All the latest news and project updates',
      iconName: 'telegram-circle',
    },
  ]

  const telegramChats = [
    {
      link: '',
      label: 'English chat',
      description: 'Solve your problems and help others',
      iconName: 'en-chat-circle',
    },
  ]

  export default defineComponent({
    name: 'social-modal-content',
    emits: ['click-to-link'],
    setup(props, { emit }) {
      const handleClick = () => emit('click-to-link')

      return {
        handleClick,
        channels: telegramChannels,
        chats: telegramChats,
      }
    },
    components: { SocialItem },
  })
</script>
