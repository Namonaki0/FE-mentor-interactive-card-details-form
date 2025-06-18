<script setup lang="ts">
import { ref } from 'vue'
import FormDetails from '@/components/FormDetails.vue'
import StyleBlock from '@/components/StyleBlock.vue'
import CompletionState from '@/components/CompletionState.vue'
import { useCardDetailsStore } from '@/stores/cardDetails'

const isSubmitted = ref(false)

const cardStore = useCardDetailsStore()

function handleFormSubmitted() {
  isSubmitted.value = true
}

function handleConfirmation() {
  isSubmitted.value = false
  cardStore.reset()
}
</script>

<template>
  <div class="app-wrapper">
    <StyleBlock />
    <Transition name="fade" mode="out-in">
      <component
        :is="isSubmitted ? CompletionState : FormDetails"
        @submitted="handleFormSubmitted"
        @reset="handleConfirmation"
        key="main-content"
      />
    </Transition>
  </div>
  <div class="landscape-warning" style="display: none">
    <p>Please rotate your device back to portrait mode for the best experience.</p>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/components/template-states';

@media screen and (orientation: landscape) and (max-width: 768px) {
  .app-wrapper {
    display: none !important;
  }

  .landscape-warning {
    display: flex !important;
    padding: 2rem;
    text-align: center;
    font-size: 1.2rem;
    color: var(--color-text);
    background-color: var(--color-background-soft);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
