<template>
  <Menu />

  <!-- ส่วนแสดงตารางประวัติ -->
  <!-- ปรับ mx ให้ไม่ไปซ้อนกับ sidebar -->
  <main class="max-w-5xl mt-10 p-4 mx-65">
    <h2 class="text-2xl font-bold mb-6 text-left font-sans">ประวัติการฝากถอนเงิน</h2>

    <!-- ส่วนตารางประวัติ -->
    <div class="shadow-sm border border-gray-200 rounded-lg">
      <table class="w-full bg-white text-sm text-left">
        <!-- ส่วนหัวเรื่องตาราง-->
        <thead class="bg-gray-50 text-gray-600 font-bold uppercase">
          <tr>
            <th class="px-6 py-4 border-b">Datetime</th>
            <th class="px-6 py-4 border-b">Amount</th>
            <th class="px-6 py-4 border-b text-center">Status</th>
            <th class="px-6 py-4 border-b">Email</th>
            <th class="px-6 py-4 border-b text-center">Action</th>
          </tr>
        </thead>

        <!-- ส่วนเนื้อหาตาราง-->
        <tbody class="divide-y divide-gray-200">
          <!--ส่วน loop แสดงข้อมูลใน history ใน localstorage-->
          <tr v-for="item in history" :key="item.id" class="hover:bg-gray-50">
            <!--วันที่ฝาก-ถอนเงิน ที่เอามาจาก localstorage ที่เก็บไว้ตอนฝาก-ถอน ในหน้า Withdraw-->
            <td class="px-6 py-4 border">{{ item.datetime }}</td>
            <!--จำนวนเงิน -->
            <td class="px-6 py-4 border font-bold">
              {{ item.amount.toLocaleString() }}
            </td>
            <!--ส่วนเช็คว่าเป็น ฝาก หรือ ถอน -->
            <td class="px-6 py-4 border text-center">
              <!--ถ้า item status ใน localstorage เป็น ฝาก ให้เป็นสีเขียว แต่ถ้าไม่ใช่ให้เป็นสีแดง แล้วแสดง status เป็น สีที่เช็ค-->
              <span :class="item.status === 'ฝาก' ? 'text-green-600' : 'text-red-600'">
                {{ item.status }}
              </span>
            </td>
            <!--ส่วนแสดง email ว่าใครฝาก-->
            <td class="px-6 py-4 border text-gray-500">{{ item.email }}</td>

            <!--ส่วนปุ่ม edit-->
            <td class="px-6 py-4 border text-center">
              <!--ถ้า item status เป็น ฝาก ถึงจะมีปุ่มให้ edit พอกดแล้วจะส่ง item ที่เรากด edit จาก localstorage ส่งไป -->
              <button
                v-if="item.status === 'ฝาก'"
                @click="openEdit(item)"
                class="bg-gray-800 text-white px-4 py-1 rounded hover:bg-black transition"
              >
                Edit
              </button>

              <!--ถ้า item status  เป็น ถอน ถึงจะมีปุ่มให้ delete-->
              <button
                v-if="item.status === 'ถอน'"
                @click="openDelete(item)"
                class="bg-gray-800 text-white px-4 py-1 rounded hover:bg-black transition"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 text-xs text-gray-500">
        แสดง 1 ถึง {{ history.length }} จาก {{ history.length }} รายการ
      </div>
    </div>

    <!-- ส่วน alert edit
    ถ้า showEditModal เป็น true จะแสดง alert
    ลูกมีตัวแปร item รอรับค่าที่ส่งมาจากแม่ชื่อ selectedItem
    ถ้าผู้ใช้กดยืนยัน ได้สถานะ confirm กลับมา กับ ค่าเงินที่ต้องการแก้ไข ตัวแม่จะเรียก function saveedit -->
    <TransactionEdit
      v-if="showEditModal"
      :item="selectedItem"
      @confirm="saveEdit"
      @cancel="showEditModal = false"
    />

    <!-- ส่วน alert delete
    ถ้าลูกส่ง confirm มา ให้ เรียก doDelete-->
    <TransactionDelete
      v-if="showDeleteModal"
      :item="selectedItem"
      @confirm="doDelete"
      @cancel="showDeleteModal = false"
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Menu from "@/components/Menu.vue";
import TransactionEdit from "@/components/TransactionEditAlert.vue";
import TransactionDelete from "@/components/TransactionDeleteAlert.vue";

const history = ref([]);
const selectedItem = ref(null);
const showEditModal = ref(false);
const showDeleteModal = ref(false);

// ตอนี่หน้าโหลด ให้ดึงข้อมูลจาก localstorage มาเก็บในตัวแปร history
onMounted(() => {
  const savedData = localStorage.getItem("history");
  // ถ้า sacvedData มีค่า ให้แปลงจาก JSON ที่เป็น string กลับมาเป็น object แล้วเก็บใน history
  if (savedData) history.value = JSON.parse(savedData);
});

// ส่วนเก็บข้อมูลลง localstorage
const saveToLocal = () => {
  localStorage.setItem("history", JSON.stringify(history.value));
};

// จัดการ Edit ถ้ากดปุ่ม edit จะรับ item ที่ส่งมา
// เก็บ item ที่ส่งมาไว้ใน selectedItem แล้วปรับค่า showEditModal เป็น true ให้แสดง alert
const openEdit = (item) => {
  selectedItem.value = item;
  showEditModal.value = true;
};

// function บันทึกการแก้ไข
// มี parameter newAmount ที่ส่งรอรับค่า localamount ที่มาจากลูก
const saveEdit = (newAmount) => {

  if (newAmount > 0) {
    // สร้างตัวแปร Index เพื่อหา index  history.value.findIndex((i) จะหาว่า index ไหนที่มี id ตรงกับ selectedItem.id
    const index = history.value.findIndex((i) => i.id === selectedItem.value.id);
    // ถ้า index หาเจอ (ไม่เท่ากับ -1)
    if (index !== -1) {
      // ให้แก้ค่า amount ที่ history.value[index] ให้เป็น Number(newAmount) ที่รับมาจากลูก
      history.value[index].amount = Number(newAmount);
      saveToLocal();
      showEditModal.value = false;
    }
  } else {
    alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");
  }
};

// จัดการ Delete ถ้ากดปุ่ม delete จะรับ item ที่เรากดลบ แล้วเก็บไว้ใน selectedItem
// แล้วปรับค่า showDeleteModal เป็น true ให้แสดง alert
const openDelete = (item) => {
  selectedItem.value = item;
  showDeleteModal.value = true;
};

// function ลบ
// จะลบรายการใน history ที่ id ไม่ตรงกับ selectedItem.id
// จะเก็บค่าลง History ใหม่ โดย history.value.filter((i) คือการกรองเอาเฉพาะรายการที่ id ไม่ตรงกับ selectedItem.id มาเก็บ
const doDelete = () => {
  history.value = history.value.filter((item) => item.id !== selectedItem.value.id);
  saveToLocal();
  showDeleteModal.value = false;
};
</script>
