<script setup lang="ts">
const emit = defineEmits<{
  (e: 'reset'): void
}>()

function handleConfirmation() {
  emit('reset')
}
</script>
<template>
  <div class="completion-state-wrapper">
    <div class="completion-state-inner">
      <img
        src="@/assets/images/icon-complete.svg"
        alt="card details save completed icon"
        class="completed-icon"
      />
      <p class="ty-message">thank you!</p>
      <p class="sec-message">We've added your card details</p>
      <button class="primary-button" @click="handleConfirmation">Continue</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/styles/components/completion-state';
</style>
