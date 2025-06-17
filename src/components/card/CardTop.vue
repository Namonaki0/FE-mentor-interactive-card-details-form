<script setup lang="ts">
import CardTemplate from './CardTemplate.vue'
</script>
<template>
  <div data-testid="card-top">
    <CardTemplate class="card-top" cardfacet="back" />
  </div>
</template>
<style scoped lang="scss">
.card-top {
  width: 280px;
  transform: translateX(90px) translateY(25px);
  transition: all 0.2s ease-in-out;

  @media (min-width: $breakpoint-tablet) {
    transform: translateX(390px) translateY(35px);
    width: 380px;
  }

  @media (min-width: $breakpoint-desktop) {
    transform: translateX(180px) translateY(-130px);
  }

  @media (min-width: $breakpoint-large) {
    width: 420px;
  }
}
</style>
