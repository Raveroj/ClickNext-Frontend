<template>
  <div class="text-center bg-rose-100 w-[400px] h-[300px] rounded-2xl flex flex-col justify-center items-center mx-auto">
    <form @submit.prevent="onSubmit" class="w-full">

      <div class="items-center mb-4">
        <label class="block text-left px-8 mb-1 font-Bold"> Email </label>
        <input
          v-model="email"
          type="text"
          placeholder="Email*"
          class="w-3/4 border-2 rounded-lg px-2.5 py-1 bg-white"
        />
        <p v-if="validateMsg != '' " class="text-red-500 text-sm mt-1">{{ validateMsg }}</p>
      </div>

      <div class="items-center mb-4">
        <label class="block text-left px-8 mb-1 font-Bold"> Password </label>
        <input
          v-model="password"
          type="password"
          placeholder="Password*"
          class="w-3/4 border-2 rounded-lg px-2.5 py-1 bg-white"
        />
        <p v-if="validateFill != ''" class="text-red-500 text-sm mt-1">{{ validateFill }}</p>
      </div>

      <div class="items-center">
        <input type="submit" value="Login" class="cursor-pointer bg-white border-2 border-gray-100 rounded-lg px-6 py-2 hover:bg-rose-50" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const validateMsg = ref("");
const validateFill = ref("");

// ฟังก์ชัน Validate Email (ต้องรับ value เข้ามา)
const checkEmailFormat = (value) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

const onSubmit = () => {
  // 1. ล้างค่า Error เก่าก่อนเสมอ
  validateMsg.value = "";
  validateFill.value = "";

  // 2. เช็คว่ากรอกครบไหม
  if (!email.value || !password.value) {
    validateFill.value = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return; // จบการทำงานทันทีถ้าไม่ครบ
  }

  // 3. เช็ครูปแบบ Email
  if (!checkEmailFormat(email.value)) {
    validateMsg.value = "รูปแบบอีเมลไม่ถูกต้อง (ต้องมี @ และ .) เช่น test@test.com";
    return; // จบการทำงานถ้าเมลผิด
  }

  // 4. ถ้าผ่านหมดทุกด่าน
  console.log("Login สำเร็จ!");
  router.push("/withdraw-Deposit");
};
</script>
