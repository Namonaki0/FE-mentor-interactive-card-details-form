<script setup lang="ts">
import CardTemplate from './CardTemplate.vue'
</script>
<template>
  <div data-testid="card-lower">
    <CardTemplate class="card-lower" />
  </div>
</template>
<style scoped lang="scss">
.card-lower {
  width: 280px;
  transform: translateX(15px) translateY(-41px);
  transition: all 0.2s ease-in-out;

  @media (min-width: $breakpoint-tablet) {
    transform: translateX(100px) translateY(340px);
    width: 380px;
  }

  @media (min-width: $breakpoint-desktop) {
    transform: translateX(120px) translateY(-160px);
  }

  @media (min-width: $breakpoint-large) {
    width: 420px;
  }
}
</style>
