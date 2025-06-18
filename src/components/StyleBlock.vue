<script setup lang="ts">
import CardTop from './card/CardTop.vue'
import CardLower from './card/CardLower.vue'
</script>
<template>
  <div class="style-block-wrapper">
    <div class="card-type-wrapper">
      <CardTop />
      <CardLower />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/styles/components/style-block';
</style>
