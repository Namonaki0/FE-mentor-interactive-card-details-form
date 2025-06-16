import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCardDetailsStore = defineStore('cardDetails', () => {
  const cardName = ref('')
  const cardNumber = ref('')
  const expiryDateMonth = ref('')
  const expiryDateYear = ref('')
  const cvv = ref('')

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

  const handleSubmit = () => {
    console.log('Card Details Submitted:', {
      cardName: cardName.value,
      cardNumber: formattedCardNumber.value,
      expiryDateMonth: expiryDateMonth.value,
      expiryDateYear: expiryDateYear.value,
      cvv: cvv.value,
    })
  }

  return {
    cardName,
    cardNumber,
    expiryDateMonth,
    expiryDateYear,
    cvv,
    formattedCardNumber,
    handleSubmit,
  }
})
