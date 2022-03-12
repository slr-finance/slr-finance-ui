<template>
  <router-view v-slot="{ Component }">
    <transition
      name="slide-fade"
      mode="out-in"
    >
      <component
        :is="Component"
        :key="$route.name"
      />
    </transition>
  </router-view>
</template>
