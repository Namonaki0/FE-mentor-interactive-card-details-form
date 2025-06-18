<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCardDetailsStore } from '@/stores/cardDetails'

const emit = defineEmits<{
  (e: 'submitted'): void
}>()

const cardStore = useCardDetailsStore()

const errors = ref<Record<string, string>>({})

const setError = (field: string, message: string) => {
  errors.value[field] = message
}

const clearError = (field: string) => {
  delete errors.value[field]
}

function handleCardNameInput(e: Event) {
  const input = e.target as HTMLInputElement
  const cleaned = input.value.replace(/[^a-zA-Z\s'-]/g, '')
  cardStore.cardName = cleaned

  if (!input.value) {
    setError('cardName', "can't be blank")
  } else if (input.value !== cleaned) {
    setError('cardName', 'Wrong format, only letters and hyphens allowed')
  } else {
    clearError('cardName')
  }
}

function handleCardNumberInput(e: Event) {
  const input = e.target as HTMLInputElement
  const digits = input.value.replace(/\D/g, '').slice(0, 16)
  const formatted = digits.replace(/(.{4})/g, '$1 ').trim()
  cardStore.cardNumber = formatted

  if (!input.value) {
    setError('cardNumber', "can't be blank")
  } else if (/\D/.test(input.value.replace(/\s/g, ''))) {
    setError('cardNumber', 'Wrong format, only numbers allowed')
  } else {
    clearError('cardNumber')
  }
}

function handleMonthInput(e: Event) {
  const input = e.target as HTMLInputElement
  let raw = input.value.replace(/\D/g, '')
  if (raw.length === 1 && parseInt(raw) > 1) raw = '0' + raw
  if (raw.length === 2 && parseInt(raw) > 12) raw = raw.slice(0, 1)
  cardStore.expiryDateMonth = raw

  if (!input.value) {
    setError('month', "can't be blank")
  } else if (/\D/.test(input.value)) {
    setError('month', 'Wrong format, only numbers allowed')
  } else if (raw.length === 2 && (parseInt(raw) < 1 || parseInt(raw) > 12)) {
    setError('month', 'Invalid month')
  } else {
    clearError('month')
  }
}

function handleYearInput(e: Event) {
  const input = e.target as HTMLInputElement
  let raw = input.value.replace(/\D/g, '').slice(0, 2)
  const current = new Date().getFullYear() % 100
  if (raw.length === 2 && parseInt(raw) < current) raw = raw.slice(0, 1)
  cardStore.expiryDateYear = raw

  if (!input.value) {
    setError('year', "can't be blank")
  } else if (/\D/.test(input.value)) {
    setError('year', 'Wrong format, only numbers allowed')
  } else if (raw.length === 2 && parseInt(raw) < current) {
    setError('year', 'Invalid year')
  } else {
    clearError('year')
  }
}

function handleCvcInput(e: Event) {
  const input = e.target as HTMLInputElement
  const cleaned = input.value.replace(/\D/g, '').slice(0, 3)
  cardStore.cvc = cleaned

  if (!input.value) {
    setError('cvc', "can't be blank")
  } else if (/\D/.test(input.value)) {
    setError('cvc', 'Wrong format, only numbers allowed')
  } else {
    clearError('cvc')
  }
}

function validateOnSubmit(): boolean {
  let valid = true

  if (!cardStore.cardName) {
    setError('cardName', "can't be blank")
    valid = false
  }

  if (!cardStore.cardNumber) {
    setError('cardNumber', "can't be blank")
    valid = false
  }

  if (!cardStore.expiryDateMonth) {
    setError('month', "can't be blank")
    valid = false
  }

  if (!cardStore.expiryDateYear) {
    setError('year', "can't be blank")
    valid = false
  }

  if (!cardStore.cvc) {
    setError('cvc', "can't be blank")
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (validateOnSubmit()) {
    emit('submitted')
  }
}

function formatMonthOnBlur() {
  const raw = cardStore.expiryDateMonth.replace(/\D/g, '')
  if (raw.length === 1) cardStore.expiryDateMonth = '0' + raw
}

function formatYearOnBlur() {
  const raw = cardStore.expiryDateYear.replace(/\D/g, '')
  const current = new Date().getFullYear() % 100
  cardStore.expiryDateYear = raw.length === 1 ? '0' + raw : parseInt(raw) >= current ? raw : ''
}

const expiryErrorMsg = computed(() => errors.value.month || errors.value.year || '')
</script>
<template>
  <div class="form-wrapper">
    <form @submit.prevent="handleSubmit">
      <div class="input-wrapper">
        <label for="cardName">Cardholder Name</label>
        <input
          type="text"
          id="cardName"
          v-model="cardStore.cardName"
          placeholder="e.g. Jane Appleseed"
          maxlength="22"
          @input="handleCardNameInput"
          :class="{ 'input-error': errors.cardName }"
        />
        <Transition name="fade-slide" mode="out-in">
          <span v-if="errors.cardName" :key="errors.cardName" class="error-msg">{{
            errors.cardName
          }}</span>
        </Transition>
      </div>
      <div class="input-wrapper">
        <label for="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          v-model="cardStore.cardNumber"
          placeholder="e.g. 1234 5678 9123 0000"
          inputmode="numeric"
          maxlength="19"
          @input="handleCardNumberInput"
          :class="{ 'input-error': errors.cardNumber }"
        />
        <Transition name="fade-slide" mode="out-in">
          <span v-if="errors.cardNumber" :key="errors.cardNumber" class="error-msg">{{
            errors.cardNumber
          }}</span>
        </Transition>
      </div>
      <div class="input-wrapper expiry-date-cvc">
        <div class="expiry-date-wrapper">
          <span class="label">Exp. Date (MM/YY)</span>
          <div class="expiry-date-inputs">
            <input
              type="text"
              id="expiryDateMonth"
              v-model="cardStore.expiryDateMonth"
              placeholder="MM"
              inputmode="numeric"
              maxlength="2"
              @input="handleMonthInput"
              @blur="formatMonthOnBlur"
              :class="{ 'input-error': errors.month }"
            />
            <input
              type="text"
              id="expiryDateYear"
              v-model="cardStore.expiryDateYear"
              placeholder="YY"
              inputmode="numeric"
              maxlength="2"
              @input="handleYearInput"
              @blur="formatYearOnBlur"
              :class="{ 'input-error': errors.year }"
            />
          </div>
          <Transition name="fade-slide" mode="out-in">
            <span v-if="expiryErrorMsg" :key="expiryErrorMsg" class="error-msg">{{
              expiryErrorMsg
            }}</span>
          </Transition>
        </div>
        <div class="cvc-wrapper">
          <label for="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            v-model="cardStore.cvc"
            placeholder="CVC"
            inputmode="numeric"
            maxlength="3"
            @input="handleCvcInput"
            :class="{ 'input-error': errors.cvc }"
          />
          <Transition name="fade-slide" mode="out-in">
            <span v-if="errors.cvc" :key="errors.cvc" class="error-msg">{{ errors.cvc }}</span>
          </Transition>
        </div>
      </div>

      <button type="submit" class="primary-button">Confirm</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/components/form-details';
</style>
