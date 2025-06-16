<script setup lang="ts">
import CardTemplate from './CardTemplate.vue'
</script>
<template>
  <CardTemplate class="card-lower" />
</template>
<style scoped lang="scss">
.card-lower {
  width: clamp(280px, 75%, 400px);
  transform: translateX(15px) translateY(-41px);
}
</style>
