<script setup lang="ts">
import FormDetails from '@/components/FormDetails.vue'
import StyleBlock from '@/components/StyleBlock.vue'
</script>

<template>
  <div class="app-wrapper">
    <StyleBlock />
    <FormDetails />
  </div>
</template>
<style lang="scss" scoped>
.app-wrapper {
  height: 100vh;
  background: var(--neutral-white);

  @media (min-width: $breakpoint-desktop) {
    display: flex;
  }
}
</style>
