<template>
  <div>
    <Menu />
  </div>
  <main class="text-center mx-20">
    <div>
      <h1 class="text-4xl font-bold ml-50">Your Balance {{ money }}</h1>
    </div>

    <div class="flex flex-col items-center mt-10">
      <label
        class="block text-center px-8 mb-1 font-Bold mt-10 max-w-[400px] item-center"
      >
        กรอกจำนวนเงิน
      </label>
      <input
        type="number"
        class="cursor-pointer bg-white border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-rose-50 ml-50"
        placeholder="กรอกจำนวนเงิน"
        v-model="amount"
      />
      <p v-if="validate != ''" class="text-red-500 text-sm mt-1">{{ validate }}</p>
      <div class="items-center">
        <button
          class="cursor-pointer bg-green-500 border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-rose-50 ml-50"
          @click="Deposit"
        >
          ฝาก
        </button>
        <button
          class="cursor-pointer bg-red-500 border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-rose-50 ml-50"
          @click="withdrawMoney"
        >
          ถอน
        </button>
      </div>

      <ModalAlert
        :amount="Number(amount)"
        v-if="showPopup"
        @confirm="doTransaction"
        @cancel="closePopup"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import Menu from "@/components/Menu.vue";
import ModalAlert from "@/components/ModalAlert.vue";

const money = ref(Number(1000000));
const amount = ref(Number(0));
const validate = ref("");
const showPopup = ref(false);
const actionType = ref("");
const userEmail = ref("");

const closePopup = () => {
  showPopup.value = false;
  validate.value = "";
  amount.value = 0;
};

const doTransaction = () => {

  console.log(userEmail.value = localStorage.getItem("userEmail"));

  if (actionType.value === "withdraw") {
    if (amount.value !== null && amount.value !== undefined && amount.value !== "") {
      if (amount.value >= 0 && amount.value <= 100000) {
        if (amount.value <= money.value) {
          money.value -= amount.value;
        } else {
          validate.value = "ยอดเงินคงเหลือไม่เพียงพอสำหรับการถอน";
        }
      } else {
        validate.value = "ฝาก-ถอน ได้ตั้งแต่ 0 - 100,000 บาท";
      }
    } else {
      validate.value = "กรุณากรอกจำนวนเงิน";
    }


  } else if (actionType.value === "deposit") {
    {
      if (amount.value !== null && amount.value !== undefined && amount.value !== "") {
        if (amount.value >= 0 && amount.value <= 100000) {
          showPopup.value = true;
          money.value += amount.value;
        } else {
          validate.value = "ฝาก-ถอน ได้ตั้งแต่ 0 - 100,000 บาท";
        }
      } else {
        validate.value = "กรุณากรอกจำนวนเงิน";
      }
    }
  } else {
    // ไม่ควรจะเกิดขึ้น
    console.error("Unknown action type:", actionType.value);
  }

  showPopup.value = false;
  validate.value = "";
  amount.value = 0;
};

const Deposit = () => {
  showPopup.value = true;
  actionType.value = "deposit";
};

const withdrawMoney = () => {
  showPopup.value = true;
  actionType.value = "withdraw";
};
</script>
