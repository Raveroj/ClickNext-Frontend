<template>
<nav class="p-4 bg-gray-100 flex justify-between items-center border-b-2 ">
    <div>
      <h1 class="text-2xl font-bold ">ClickNext</h1>
    </div>
    <div>
      <button class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" @click="logout">Logout</button>
    </div>
  </nav>

 <sidebar class="w-64 bg-gray-100 h-full fixed left-0 p-4 border-r-2">
  <div class="text-center font-bold mb-6 bg-gray-300 rounded-lg py-2">
    <RouterLink to="/withdraw" class="text-center font-bold">Deposit/Withdraw</RouterLink>
  </div>
  <div class="text-center font-bold mb-6">
    <RouterLink to="/transaction">Transaction</RouterLink>
  </div>
  </sidebar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const logout = () => {
  router.push("/");
};

</script>
