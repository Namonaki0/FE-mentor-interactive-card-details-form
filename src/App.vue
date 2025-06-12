<script setup lang="ts">
import CardDetails from './components/CardDetails.vue'
import StyleBlock from './components/StyleBlock.vue'
</script>

<template>
  <div class="app-wrapper">
    <StyleBlock />
    <CardDetails />
  </div>
</template>
<style lang="scss" scoped>
.app-wrapper {
  height: 100vh;
  background: var(--neutral-white);
}
</style>
