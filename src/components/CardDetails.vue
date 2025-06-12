<script setup lang="ts">
import { ref } from 'vue'
const cardDetails = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
})
</script>
<template>
  <div class="form-wrapper">
    <form>
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" v-model="cardDetails.cardNumber" />

      <label for="expiryDate">Expiry Date:</label>
      <input type="text" id="expiryDate" v-model="cardDetails.expiryDate" />

      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" v-model="cardDetails.cvv" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
