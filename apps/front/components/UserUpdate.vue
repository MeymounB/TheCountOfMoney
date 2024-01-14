<template>
<div class="flex items-center justify-center mb-10">
     <div class="p-6 bg-base-200 rounded-xl shadow-md w-full max-w-2xl">
      <h2 class="text-2xl mb-4 font-semibold text-center">Your Profile</h2>
       <div class="mb-4">
         <div class="w-full">
           <label class="block mb-2 text-sm font-medium">First Name:</label>
           <div class="flex flex-col md:flex-row items-center">
             <input v-model="user.firstname" class="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100 w-full" />
             <button @click="updateUser('firstname', user.firstname)" class="mt-2 md:mt-0 md:ml-2 btn btn-primary btn-xs md:btn-sm w-full md:w-auto">Update<span v-if="loadingFirstname" class="loading loading-spinner loading-xs"></span></button>
          </div>
         </div>
       </div>
      <div class="mb-4">
        <div class="w-full">
          <label class="block mb-2 text-sm font-medium">Last Name:</label>
          <div class="flex flex-col md:flex-row items-center">
            <input v-model="user.lastname" class="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100 w-full" />
            <button @click="updateUser('lastname', user.lastname)" class="mt-2 md:mt-0 md:ml-2 btn btn-primary btn-xs md:btn-sm w-full md:w-auto">Update <span v-if="loadingLastname" class="loading loading-spinner loading-xs"></span></button>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <div class="w-full">
          <label class="block mb-2 text-sm font-medium ">Nickname:</label>
            <div class="flex flex-col md:flex-row items-center">
              <input v-model="user.nickname" class="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100 w-full" />
              <button @click="updateUser('nickname', user.nickname)" class="mt-2 md:mt-0 md:ml-2 btn btn-primary btn-xs md:btn-sm w-full md:w-auto">Update<span v-if="loadingNickname" class="loading loading-spinner loading-xs"></span></button>
            </div>
        </div>
      </div>
      <div class="mb-4">
        <div class="w-full">
          <label class="block mb-2 text-sm font-medium ">Your Keywords:</label>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2">
            <div v-for="(keyword, index) in user.pressKeywords" class="badge badge-neutral">
              {{ keyword }}
              <button @click="deleteKeyword(index)" class="badge badge-xs badge-error ml-1">X</button>
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-center">
            <input v-model="newKeyword" placeholder="Enter a keyword" class="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100 w-full" />
            <button @click="addKeyword" class="mt-2 md:mt-0 md:ml-2 btn btn-primary btn-xs md:btn-sm w-full md:w-auto">+<span v-if="loadingKeyword" class="loading loading-spinner loading-xs"></span></button>
          </div>
        </div>
     </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import { useFetchAPI } from "../composables/fetch.ts";
import { useSessionStore } from "~/stores/session";

const session = useSessionStore();
const user = computed(() => session.user);
const userId = session.user?.id;
const loadingFirstname = ref(false);
const loadingLastname = ref(false);
const loadingNickname = ref(false);
const loadingKeyword = ref(false);
const newKeyword = ref('');
const addKeyword = async () => {
  if (newKeyword.value.trim() === '') {
    alert('Please enter a keyword');
    return;
  }
  const updatedKeywords = [...user.value.pressKeywords, newKeyword.value];
  user.value.pressKeywords = updatedKeywords;
  newKeyword.value = '';
  localStorage.setItem('user', JSON.stringify(user.value));
  loadingKeyword.value = true;
  const response = await useFetchAPI<any>(
    "PATCH",
    `/users/${userId}/pressKeywords`,
    { pressKeywords: updatedKeywords }
  );
  loadingKeyword.value = false;
  if (response.ok) {
    window.location.reload();
  } else {
    return alert("Update went wrong!");
  }
};

  const deleteKeyword = async (index) => {
    const updatedKeywords = [...user.value.pressKeywords];
    updatedKeywords.splice(index, 1);
    user.value.pressKeywords = updatedKeywords;
    localStorage.setItem('user', JSON.stringify(user.value));
    loadingKeyword.value = true;
    const response = await useFetchAPI<any>(
      "PATCH",
      `/users/${userId}/pressKeywords`,
      { pressKeywords: updatedKeywords }
    );
    loadingKeyword.value = false;
    if (response.ok) {
      window.location.reload();
    } else {
      return alert("Update went wrong!");
    }
  };

const updateUser = async (field, value) => {
  if (field === 'firstname') loadingFirstname.value = true;
  if (field === 'lastname') loadingLastname.value = true;
  if (field === 'nickname') loadingNickname.value = true;
  const response = await useFetchAPI<any>(
    "PATCH",
    `/users/${userId}`,
    { [field]: value }
  );
  if (field === 'firstname') loadingFirstname.value = false;
  if (field === 'lastname') loadingLastname.value = false;
  if (field === 'nickname') loadingNickname.value = false;
  if (response.ok) {
    user.value = { ...user.value, [field]: value };
    window.location.reload();
  } else {
    return alert("Update went wrong!");
  }
};
</script>