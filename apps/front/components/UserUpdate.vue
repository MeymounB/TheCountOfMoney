<template>
<div class="flex items-center justify-center mb-10">
    <div class="p-6 bg-base-200 rounded-xl shadow-md w-100">
      <h2 class="text-2xl mb-4 font-semibold text-center">Your Profile</h2>
      <div class="mb-4 flex justify-between">
        <div>
          <label class="block mb-2 text-sm font-medium">First Name:</label>
          <div> <input v-model="user.firstname" class="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100" />
           <button @click="updateUser('firstname', user.firstname)" class="ml-2 btn btn-primary btn-xs sm:btn-sm">Update<span v-if="loadingFirstname" className="loading loading-spinner loading-xs"></span></button>
        </div></div>
      </div>
      <div class="mb-4 flex justify-between">
        <div>
          <label class="block mb-2 text-sm font-medium">Last Name:</label>
          <input v-model="user.lastname" class=" px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100" />
          <button @click="updateUser('lastname', user.lastname)" class="ml-2 btn btn-primary btn-xs sm:btn-sm">Update <span v-if="loadingLastname" className="loading loading-spinner loading-xs"></span></button>
        </div>
      </div>
      <div class="mb-4 flex justify-between">
        <div>
          <label class="block mb-2 text-sm font-medium ">Nickname:</label>
          <input v-model="user.nickname" class=" px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100" />
          <button @click="updateUser('nickname', user.nickname)" class="ml-2 btn btn-primary btn-xs sm:btn-sm">Update<span v-if="loadingNickname" className="loading loading-spinner loading-xs"></span></button>
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