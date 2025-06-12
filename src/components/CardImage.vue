<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  cardfacet?: string
}>()

const cardImage = computed(() => {
  return props.cardfacet === 'back'
    ? new URL(`../assets/images/bg-card-back.png`, import.meta.url).href
    : new URL(`../assets/images/bg-card-front.png`, import.meta.url).href
})
</script>

<template>
  <div class="card-image-wrapper">
    <img :src="cardImage" alt="Card Image" class="card-image" />
  </div>
</template>
