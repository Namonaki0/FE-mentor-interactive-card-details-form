<script setup lang="ts">
const emit = defineEmits(['reset'])

function handleConfirmation() {
  emit('reset')
}
</script>
<template>
  <div class="completion-state-wrapper">
    <img
      src="@/assets/images/icon-complete.svg"
      alt="card details save completed icon"
      class="completed-icon"
    />
    <p class="ty-message">thank you!</p>
    <p class="sec-message">We've added your card details</p>
    <button class="primary-button" @click="handleConfirmation">Continue</button>
  </div>
</template>
<style lang="scss" scoped>
.completion-state-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  padding: 1.5rem;
  color: var(--neutral-purple-950);

  @media (min-width: $breakpoint-tablet) {
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }

  .completed-icon {
    margin-bottom: 2rem;
  }

  .ty-message {
    text-transform: uppercase;
    font-size: 1.8rem;
    letter-spacing: 1.5px;
    margin-bottom: 10px;
  }

  .sec-message {
    color: var(--neutral-gray-400);
    margin-bottom: 40px;
  }
}
</style>
