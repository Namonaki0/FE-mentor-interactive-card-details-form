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
</template>
<style lang="scss" scoped>
.app-wrapper {
  height: 100vh;
  background: var(--neutral-white);

  @media (min-width: $breakpoint-desktop) {
    display: flex;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
