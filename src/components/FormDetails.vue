<script setup lang="ts">
import { useCardDetailsStore } from '@/stores/cardDetails'

const cardStore = useCardDetailsStore()
</script>
<template>
  <div class="form-wrapper">
    <form @submit.prevent="cardStore.handleSubmit">
      <div class="input-wrapper">
        <label for="cardName">Cardholder Name:</label>
        <input
          type="text"
          id="cardName"
          v-model="cardStore.cardName"
          placeholder="e.g. Jane Appleseed"
          maxlength="20"
        />
      </div>
      <div class="input-wrapper">
        <label for="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          v-model="cardStore.formattedCardNumber"
          placeholder="e.g. 1234 5678 9123 0000"
          maxlength="19"
        />
      </div>

      <div class="input-wrapper expiry-date-cvc">
        <div class="expiry-date-wrapper">
          <label for="expiryDate">Exp. Date (MM/YY)</label>
          <div class="expiry-date-inputs" id="expiryDate">
            <input
              type="text"
              id="expiryDateMonth"
              v-model="cardStore.expiryDateMonth"
              placeholder="MM"
              maxlength="2"
            />
            <input
              type="text"
              id="expiryDateYear"
              v-model="cardStore.expiryDateYear"
              placeholder="YY"
              maxlength="2"
            />
          </div>
        </div>
        <div class="cvc-wrapper">
          <label for="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            v-model="cardStore.cvv"
            placeholder="e.g. 123"
            maxlength="3"
          />
        </div>
      </div>

      <button type="submit">Submit</button>
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

  form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;

      .expiry-date-wrapper {
        flex: 1;

        .expiry-date-inputs {
          display: flex;
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
    button {
      padding: 0.75rem;
      font-size: 1rem;
      width: 100%;
    }

    .expiry-date-cvc {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
