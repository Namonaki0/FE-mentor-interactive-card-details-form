<script setup lang="ts">
import CardTemplate from './CardTemplate.vue'
</script>
<template>
  <CardTemplate class="card-top" cardfacet="back" />
</template>
<style scoped lang="scss">
.card-top {
  width: clamp(280px, 75%, 400px);
  transform: translateX(60px) translateY(25px);
}
</style>
