<template>
  <div class="relative pt-ui-page-header-spacing space-y-ui-page-inner-spacing z-ui-page-content flex-shrink-0 w-72 box-content flex flex-col justify-start items-center">
    <div class="flex-1 relative">
      <slot name="top"/>
    </div>
    <div class="sticky bottom-0 top-0 pb-ui-page-bottom-spacing space-y-ui-page-inner-spacing">
      <slot name="bottom"/>
    </div>
  </div>
</template>