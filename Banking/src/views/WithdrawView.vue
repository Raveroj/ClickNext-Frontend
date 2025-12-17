<template>
  <div>
    <withdraw />

  </div>
  <main class="text-center mx-20">
    <div>
      <h1 class="text-4xl font-bold ml-50 ">Your Balance {{ money }}</h1>
    </div>

    <div class="flex flex-col items-center mt-10">
      <label class="block text-center px-8 mb-1 font-Bold mt-10 max-w-[400px] item-center"> กรอกจำนวนเงิน </label>
      <input type="number"
        class="cursor-pointer bg-white border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-rose-50 ml-50"
        placeholder="กรอกจำนวนเงิน" v-model="amount">
      <p v-if="validate != ''" class="text-red-500 text-sm mt-1">{{ validate }}</p>
      <div class="items-center">
        <button
          class="cursor-pointer bg-green-500 border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-rose-50 ml-50"
          @click="withdrawMoney">ฝาก</button>
        <button
          class="cursor-pointer bg-red-500 border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-rose-50 ml-50"
          @click="Deposit">ถอน</button>
      </div>

    </div>

  </main>


</template>

<script setup>
import { ref } from 'vue';
import withdraw from '@/components/Withdraw.vue';

const money = ref(Number(1000000));
const amount = ref(Number(0));
const validate = ref("");

const Deposit = () => {
  if (amount.value !== null && amount.value !== undefined && amount.value !== "") {

    if (amount.value >= 0 && amount.value <= 100000) {
      money.value -= amount.value;
    } else {
      validate.value = "ฝาก-ถอน ได้ตั้งแต่ 0 - 100,000 บาท";
    }

  }else{
    validate.value = "กรุณากรอกจำนวนเงิน";
  }

};

const withdrawMoney = () => {
  if (amount.value !== null && amount.value !== undefined && amount.value !== "") {

    if (amount.value >= 0 && amount.value <= 100000) {
      money.value += amount.value;
    } else {
      validate.value = "ฝาก-ถอน ได้ตั้งแต่ 0 - 100,000 บาท";
    }

  }else{
    validate.value = "กรุณากรอกจำนวนเงิน";
  }
};

</script>
