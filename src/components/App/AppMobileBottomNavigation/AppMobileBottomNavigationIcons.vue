<template>
    <component :is="iconComponent"/>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { UiIconMobileNavigationDashboard, UiIconMobileNavigationReferral, UiIconMobileNavigationStaking, UiIconPixelArrowBoth } from '@slr-finance/uikit'
    
  export default defineComponent({
    name: 'app-mobile-bottom-navigation-icons',
    props: {
      iconComponent: {
        type: String,
        required: true,
      },
    },
    components: {
      UiIconMobileNavigationDashboard,
      UiIconMobileNavigationReferral,
      UiIconMobileNavigationStaking,
      UiIconPixelArrowBoth,
    }
  })
  </script>
  