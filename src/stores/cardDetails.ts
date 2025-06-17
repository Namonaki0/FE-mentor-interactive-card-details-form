import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCardDetailsStore = defineStore('cardDetails', () => {
  const cardName = ref('')
  const cardNumber = ref('')
  const expiryDateMonth = ref('')
  const expiryDateYear = ref('')
  const cvc = ref('')

  const formattedCardNumber = computed({
    get() {
      return cardNumber.value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
    },
    set(value: string) {
      cardNumber.value = value.replace(/\D/g, '').slice(0, 16)
    },
  })

  function reset() {
    cardName.value = ''
    cardNumber.value = ''
    expiryDateMonth.value = ''
    expiryDateYear.value = ''
    cvc.value = ''
  }

  return {
    cardName,
    cardNumber,
    expiryDateMonth,
    expiryDateYear,
    cvc,
    formattedCardNumber,
    reset,
  }
})
