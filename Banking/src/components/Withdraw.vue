<template>
  <div>
    <Menu />
  </div>
  <!-- ส่วนแสดงยอดเงินคงเหลือ -->
  <!-- ปรับ mx ให้ไม่ไปซ้อนกับ sidebar -->
  <main class="text-center mx-65">
    <div>
      <h1 class="text-4xl font-bold">ยอดเงินคงเหลือ {{ currentBalance }}</h1>
    </div>

    <!-- ส่วนแสดงกรอกเงิน -->
    <div class="items-center mt-10">
      <label class="block text-center mb-1 font-Bold mt-10 item-center">
        กรอกจำนวนเงิน *
      </label>
      <input
        type="number"
        class="cursor-pointer bg-white border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-rose-50"
        placeholder="กรอกจำนวนเงิน"
        v-model="amount"
      />
      <!-- ส่วนแสดง validate -->
      <p v-if="validate != ''" class="text-red-500 text-sm mt-1">{{ validate }}</p>

      <!-- ส่วนแสดง ปุ่ม ฝาก กับ ถอน -->
      <div class="items-center">
        <button
          class="cursor-pointer bg-green-500 border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-green-100 mx-5"
          @click="Deposit"
        >
          ฝาก
        </button>

        <button
          class="cursor-pointer bg-red-500 border-2 border-gray-100 rounded-lg px-6 py-2 mt-5 hover:bg-red-100 mx-5"
          @click="withdrawMoney"
        >
          ถอน
        </button>
      </div>

      <!-- ส่วนแสดง popup ยืนยัน ถ้าลูกส่งสัญญาณ confirm / cancel จะเรียก function-->
      <!-- amount ตัวลูก = amount ตัวแม่-->
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
import { ref, computed, onMounted } from "vue";
import Menu from "@/components/Menu.vue";
import ModalAlert from "@/components/ModalAlert.vue";

const amount = ref(Number(0));
const validate = ref("");
const showPopup = ref(false);
const actionType = ref("");
const history = ref([]);
const initialBalance = 1000000;

// คำนวณยอดเงินคงเหลือ โดยเริ่มจาก initialBalance แล้วบวก-ลบ ตามรายการใน history
// ใช้ computed เพื่อให้คำนวณใหม่ทุกครั้งที่ history เปลี่ยน เอาไว้คำนวณเวลาหน้า Transaction แก้ด้วย
const currentBalance = computed(() => {
  let total = initialBalance;
  for (const item of history.value) {
    if (item.status === "ฝาก") {
      total += Number(item.amount);
    } else {
      total -= Number(item.amount);
    }
  }
  return total;
});

// ตอนี่หน้าโหลด ให้ดึงข้อมูลจาก localstorage มาเก็บในตัวแปร savedHistory
onMounted(() => {
  const savedHistory = localStorage.getItem("history");
  //ถ้า savedHistory มีค่า ให้แปลงจาก JSON ที่เป็น string กลับมาเป็น object แล้วเก็บใน history
  history.value = savedHistory ? JSON.parse(savedHistory) : [];
});


// ส่วนเก็บข้อมูลลง localstorage
const saveToLocalStorage = () => {
  // แปลง history.value เป็น JSON string แล้วเก็บลง localstorage เก็บภายใต้ชื่อ "history"
  localStorage.setItem("history", JSON.stringify(history.value));
};

//function ฝาก Deposit
const Deposit = () => {
  showPopup.value = true;
  actionType.value = "deposit";
};
//function ถอน withdrawMoney
const withdrawMoney = () => {
  showPopup.value = true;
  actionType.value = "withdraw";
};

//function ปิด popup ถ้าตัวลูกส่ง cancel มา
const closePopup = () => {
  //ปรับค่า showPopup เป็น false เพื่อปิด popup
  showPopup.value = false;
  //เคลียร์ validate กับ ค่าเงินให้เป็นค 0
  validate.value = "";
  amount.value = 0;
};

//function ทฝาก ถอน ถ้าตัวลูกส่ง confirm จะมาเรียก function นี้
const doTransaction = () => {
  // 1. ดึงอีเมลว่าใครเป็นคนทำรายการ และ ให้inputAmount เป็น Number ของ amount ที่กรอกมา
  const email = localStorage.getItem("userEmail");
  const inputAmount = Number(amount.value);

  // 2. เช็คว่ากรอกจำนวนเงินถูกต้องไหม ต้องมากกว่า 0 และไม่เกิน 100,000 และไม่เป็นค่าว่าง
  if (inputAmount = '' || inputAmount <= 0 || inputAmount > 100000) {
    validate.value = "กรุณากรอกจำนวนเงิน 1 - 100,000 บาท";
    showPopup.value = false;
    return;
  }

  // 3. ตรวจสอบเงื่อนไขเฉพาะ "ถอน"
  if (actionType.value === "withdraw") {
    // เช็คเงื่อนไขว่า inputAmount ต้องไม่เกินยอดเงินคงเหลือ
    if (inputAmount > currentBalance.value) {
      validate.value = "ยอดเงินคงเหลือไม่เพียงพอสำหรับการถอน";
      showPopup.value = false;
      return;
    }
  }

  // 4. สร้าง Record ใหม่ (ต้องสร้างก่อน unshift)
  // สร้าง object newRecord ที่เก็บข้อมูล id, datetime, amount, status, email จะได้เอาไปบันทึกลง history ใน localstorage
  const newRecord = {
    id: Date.now(),
    datetime: new Date().toLocaleString("th-TH"),
    amount: inputAmount,
    status: actionType.value === "deposit" ? "ฝาก" : "ถอน",
    email: email
  };

  // 5. บันทึกข้อมูล
  history.value.unshift(newRecord); // เพิ่มลงใน Array history ก่อนจะแปลงลง localstorage
  saveToLocalStorage(); // เซฟลง LocalStorage

  // 6. ปิดป๊อปอัพและล้างค่า
  showPopup.value = false;
  validate.value = "";
  amount.value = 0;
};
</script>
