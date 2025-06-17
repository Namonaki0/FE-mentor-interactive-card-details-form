<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCardDetailsStore } from '@/stores/cardDetails'

const emit = defineEmits(['submitted'])

const cardStore = useCardDetailsStore()

const nameError = ref(false)
const numberError = ref(false)
const monthError = ref(false)
const yearError = ref(false)
const cvcError = ref(false)

const nameErrorMsg = ref('')
const numberErrorMsg = ref('')
const monthErrorMsg = ref('')
const yearErrorMsg = ref('')
const cvcErrorMsg = ref('')

function handleCardNameInput(e: Event) {
  const input = e.target as HTMLInputElement
  const cleaned = input.value.replace(/[^a-zA-Z\s'-]/g, '')
  cardStore.cardName = cleaned
  nameError.value = input.value !== cleaned
  if (!input.value) {
    nameError.value = true
    nameErrorMsg.value = "can't be blank"
  } else if (input.value !== cleaned) {
    nameError.value = true
    nameErrorMsg.value = 'Wrong format, only letters and hyphens allowed'
  } else {
    nameError.value = false
    nameErrorMsg.value = ''
  }
}

function handleCardNumberInput(e: Event) {
  const input = e.target as HTMLInputElement
  const digits = input.value.replace(/\D/g, '').slice(0, 16)
  const formatted = digits.replace(/(.{4})/g, '$1 ').trim()
  cardStore.cardNumber = formatted
  numberError.value = /\D/.test(input.value.replace(/\s/g, ''))
  if (!input.value) {
    numberError.value = true
    numberErrorMsg.value = "can't be blank"
  } else if (/\D/.test(input.value.replace(/\s/g, ''))) {
    numberError.value = true
    numberErrorMsg.value = 'Wrong format, only numbers allowed'
  } else {
    numberError.value = false
    numberErrorMsg.value = ''
  }
}

function handleMonthInput(e: Event) {
  const input = e.target as HTMLInputElement
  let raw = input.value.replace(/\D/g, '')
  if (raw.length === 1 && parseInt(raw) > 1) {
    raw = '0' + raw
  } else if (raw.length === 2) {
    const num = parseInt(raw)
    if (num > 12) {
      raw = raw.slice(0, 1)
    }
  }
  cardStore.expiryDateMonth = raw
  if (!input.value) {
    monthError.value = true
    monthErrorMsg.value = "can't be blank"
  } else if (/\D/.test(input.value)) {
    monthError.value = true
    monthErrorMsg.value = 'Wrong format, only numbers allowed'
  } else if (raw.length === 2 && (parseInt(raw) < 1 || parseInt(raw) > 12)) {
    monthError.value = true
    monthErrorMsg.value = 'Invalid month'
  } else {
    monthError.value = false
    monthErrorMsg.value = ''
  }
}

function formatMonthOnBlur() {
  const raw = cardStore.expiryDateMonth.replace(/\D/g, '')
  if (raw.length === 1) {
    cardStore.expiryDateMonth = '0' + raw
  }
}

const currentYearLastTwoDigits = new Date().getFullYear() % 100

function handleYearInput(e: Event) {
  const input = e.target as HTMLInputElement
  let raw = input.value.replace(/\D/g, '').slice(0, 2)
  if (raw.length === 2 && parseInt(raw) < currentYearLastTwoDigits) {
    raw = raw.slice(0, 1)
  }
  cardStore.expiryDateYear = raw
  if (!input.value) {
    yearError.value = true
    yearErrorMsg.value = "can't be blank"
  } else if (/\D/.test(input.value)) {
    yearError.value = true
    yearErrorMsg.value = 'Wrong format, only numbers allowed'
  } else if (raw.length === 2 && parseInt(raw) < currentYearLastTwoDigits) {
    yearError.value = true
    yearErrorMsg.value = 'Invalid year'
  } else {
    yearError.value = false
    yearErrorMsg.value = ''
  }
}

function formatYearOnBlur() {
  let raw = cardStore.expiryDateYear.replace(/\D/g, '')
  const currentYear = new Date().getFullYear() % 100
  if (raw.length === 1) {
    raw = '0' + raw
  }
  if (raw.length === 2 && parseInt(raw) >= currentYear) {
    cardStore.expiryDateYear = raw
  } else {
    cardStore.expiryDateYear = ''
  }
}

function handleCvcInput(e: Event) {
  const input = e.target as HTMLInputElement
  const cleaned = input.value.replace(/\D/g, '').slice(0, 3)
  cardStore.cvc = cleaned
  if (!input.value) {
    cvcError.value = true
    cvcErrorMsg.value = "can't be blank"
  } else if (/\D/.test(input.value)) {
    cvcError.value = true
    cvcErrorMsg.value = 'Wrong format, only numbers allowed'
  } else {
    cvcError.value = false
    cvcErrorMsg.value = ''
  }
}

function validateOnSubmit() {
  let valid = true

  if (!cardStore.cardName) {
    nameError.value = true
    nameErrorMsg.value = "can't be blank"
    valid = false
  } else {
    nameErrorMsg.value = ''
  }

  if (!cardStore.cardNumber) {
    numberError.value = true
    numberErrorMsg.value = "can't be blank"
    valid = false
  } else {
    numberErrorMsg.value = ''
  }

  if (!cardStore.expiryDateMonth) {
    monthError.value = true
    monthErrorMsg.value = "can't be blank"
    valid = false
  } else {
    monthErrorMsg.value = ''
  }

  if (!cardStore.expiryDateYear) {
    yearError.value = true
    yearErrorMsg.value = "can't be blank"
    valid = false
  } else {
    yearErrorMsg.value = ''
  }

  if (!cardStore.cvc) {
    cvcError.value = true
    cvcErrorMsg.value = "can't be blank"
    valid = false
  } else {
    cvcErrorMsg.value = ''
  }

  return valid
}

function handleSubmit() {
  if (validateOnSubmit()) {
    emit('submitted')
  }
}

const expiryErrorMsg = computed(() => {
  if (monthErrorMsg.value) return monthErrorMsg.value
  if (yearErrorMsg.value) return yearErrorMsg.value
  return ''
})
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
          :class="{ 'input-error': nameError }"
        />
        <Transition name="fade-slide" mode="out-in">
          <span v-if="nameErrorMsg" :key="nameErrorMsg" class="error-msg">{{ nameErrorMsg }}</span>
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
          :class="{ 'input-error': numberError }"
        />
        <Transition name="fade-slide" mode="out-in">
          <span v-if="numberErrorMsg" :key="numberErrorMsg" class="error-msg">{{
            numberErrorMsg
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
              :class="{ 'input-error': monthError }"
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
              :class="{ 'input-error': yearError }"
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
            :class="{ 'input-error': cvcError }"
          />
          <Transition name="fade-slide" mode="out-in">
            <span v-if="cvcErrorMsg" :key="cvcErrorMsg" class="error-msg">{{ cvcErrorMsg }}</span>
          </Transition>
        </div>
      </div>

      <button type="submit" class="primary-button">Confirm</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (min-width: $breakpoint-tablet) {
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }

  form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;

      label {
        color: var(--neutral-purple-950);
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 1px;
        margin-bottom: 5px;
      }

      input {
        color: var(--neutral-purple-950);
        font-family: var(--font-primary);
        cursor: pointer;
        border: 1px solid var(--neutral-gray-400);
        border-radius: 6px;
        transition: all 0.5s ease;

        &:focus {
          outline: none;
          border: 1px solid var(--neutral-purple-950);
        }
      }

      .expiry-date-wrapper {
        width: 50%;

        .expiry-date-inputs {
          display: flex;
          gap: 8px;
        }
      }

      .cvc-wrapper {
        flex: 2;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
      }
    }

    .expiry-date-cvc {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      gap: 10px;
    }
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
