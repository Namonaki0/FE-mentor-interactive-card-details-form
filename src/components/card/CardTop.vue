<script setup lang="ts">
import CardTemplate from './CardTemplate.vue'
</script>
<template>
  <div data-testid="card-top">
    <CardTemplate class="card-top" cardfacet="back" />
  </div>
</template>
<style scoped lang="scss">
@import '@/assets/styles/components/card-top';
</style>
