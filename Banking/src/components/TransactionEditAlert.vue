<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

  <!-- ส่วนรายละเอียดที่หน้าแม่ส่งมา แล้วเก็บอยู่ใน item -->
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
      <h2 class="text-xl font-bold mb-1">แก้ไขจำนวนเงิน{{ item.status }}</h2>
      <p class="text-gray-500 text-sm mb-1">ของวันที่ {{ item.datetime }}</p>
      <p class="text-gray-500 text-sm mb-4">จากอีเมล {{ item.email }}</p>


      <!-- ส่วนกรอกจำนวนเงิน-->
      <label class="block text-sm font-medium mb-2">จำนวนเงิน *</label>
      <!-- ผูกค่ากับ localamount เพื่อเอาค่าเงินเก่ามาแสดง กัีบ ตอนแก้ไขก็จะแก้ค่า localamount ไปด้วย-->
      <input
        type="number"
        v-model="localAmount"
        class="border w-full p-2 rounded-md mb-6 outline-none focus:ring-2 focus:ring-black"
      >

      <div class="flex items-center gap-4">

      <!-- ส่วนยืนยัน -->
      <!-- ส่งว่าผู้ใช้กด confirm กับ ส่งค่าที่ผู้ใช้แก้กลับไปหน้าแม่ -->
        <button
          @click="$emit('confirm', localAmount)"
          class="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-black transition-colors"
        >
          ยืนยัน
        </button>

        <!-- ส่วนยกเลิก -->
        <button
          @click="$emit('cancel')"
          class="text-blue-500 hover:underline"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  item: Object
});
const emit = defineEmits(['confirm', 'cancel']);
// สร้างตัวแปรภายในเพื่อไม่ให้ไปกระทบค่าจริงจนกว่าจะกดยืนยัน
//ค่า localamount ตอนแรกจะเท่ากับ item.amount ที่ส่งมาจากแม่
//ถ้าแก้ จะไปแก้ค่า localamount แล้วพอกดยืนยันจะส่ง localamount กลับให้แม่
const localAmount = ref(props.item.amount);
</script>
