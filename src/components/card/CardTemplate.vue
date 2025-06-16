<script setup lang="ts">
import { computed } from 'vue'
import { useCardDetailsStore } from '@/stores/cardDetails'

const cardStore = useCardDetailsStore()

const props = defineProps<{
  cardfacet?: string
}>()

const cardImage = computed(() => {
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
      <p>{{ cardStore.cvv || '000' }}</p>
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
.card-wrapper {
  position: relative;
  width: clamp(300px, 75%, 400px);

  .card-image {
    width: 100%;
    display: block;
  }

  .card-details {
    .logo-wrapper {
      position: absolute;
      top: 12%;
      left: 7%;
      width: 25%;
      height: auto;

      .card-logo {
        width: 100%;
        display: block;
      }
    }

    .card-data-wrapper {
      position: absolute;
      bottom: 10%;
      left: 7%;
      font-size: 12px;
      color: white;
      width: calc(100% - 14%);

      .card-number-data {
        font-size: 1.23rem;
        letter-spacing: 1px;

        @media (min-width: $breakpoint-tablet) {
          font-size: 1.5rem;
          letter-spacing: 3px;
        }
      }

      .card-name-date {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .cvc-wrapper {
    position: absolute;
    top: 42%;
    right: 12%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: white;

    p {
      font-size: 14px;
      margin-bottom: 3px;
    }
  }
}
</style>
