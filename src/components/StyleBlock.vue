<script setup lang="ts">
import CardTop from './card/CardTop.vue'
import CardLower from './card/CardLower.vue'
</script>
<template>
  <div class="style-block-wrapper">
    <CardTop />
    <CardLower />
  </div>
</template>
<style lang="scss" scoped>
.style-block-wrapper {
  background-repeat: no-repeat;
  height: 30vh;
  width: 100%;
  background-image: url('@/assets/images/bg-main-mobile.png');
  background-size: cover;

  @media (min-width: $breakpoint-tablet) {
    display: flex;
    flex-direction: column-reverse;
  }

  @media (min-width: $breakpoint-desktop) {
    background-repeat: no-repeat;
    height: 100%;
    width: 40%;
    background-image: url('@/assets/images/bg-main-desktop.png');
  }
}
</style>
