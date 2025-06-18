<script setup lang="ts">
import { computed } from 'vue'
import { useCardDetailsStore } from '@/stores/cardDetails'

const cardStore = useCardDetailsStore()

interface CardTemplateProps {
  cardfacet?: string
}

const props = defineProps<CardTemplateProps>()

const cardImage = computed<string>(() => {
  return props.cardfacet === 'back'
    ? new URL(`@/assets/images/bg-card-back.png`, import.meta.url).href
    : new URL(`@/assets/images/bg-card-front.png`, import.meta.url).href
})

const cardLogo = new URL('@/assets/images/card-logo.svg', import.meta.url).href
</script>

<template>
  <div class="card-wrapper">
    <img :src="cardImage" alt="Card Image" class="card-image" />
    <div class="cvc-wrapper" v-if="props.cardfacet === 'back'">
      <p>{{ cardStore.cvc || '000' }}</p>
    </div>
    <div class="card-details" v-else>
      <div class="logo-wrapper">
        <img :src="cardLogo" alt="Card Logo" class="card-logo" />
      </div>
      <div class="card-data-wrapper">
        <p class="card-number-data">{{ cardStore.formattedCardNumber || '0000 0000 0000 0000' }}</p>
        <div class="card-name-date">
          <p class="card-name">{{ cardStore.cardName || 'Jane Appleseed' }}</p>
          <p class="card-date">
            {{ (cardStore.expiryDateMonth || '00') + '/' + (cardStore.expiryDateYear || '00') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/components/card-template';
</style>
