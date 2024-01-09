<template>
  <div class="container flex flex-col mx-auto rounded-lg">
    <div
      class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5"
    >
      <div class="flex items-center justify-center w-full lg:p-12">
        <div class="flex items-center xl:p-10">
          <form
            class="flex flex-col w-full h-full pb-6 bg-base-200 p-10 text-center rounded-3xl"
            @submit.prevent="signup"
          >
            <h3 class="mb-3 text-4xl font-extrabold text-dark-grey-900">
              Sign Up
            </h3>
            <label for="email" class="mb-2 text-sm text-start text-grey-900"
              >NickName*</label
            >
           <input
              id="nick_name"
              type="name"
              placeholder="NickName"
              v-model="nickName"
              class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <label for="email" class="mb-2 text-sm text-start text-grey-900"
              >First Name*</label
            >
           <input
              id="first_name"
              type="name"
              placeholder="Firstname"
              v-model="firstName"
              class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <label for="email" class="mb-2 text-sm text-start text-grey-900"
              >Last Name*</label
            >
            <input
              id="last_name"
              type="name"
              placeholder="Lastname"
              v-model="lastName"
              class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <label for="email" class="mb-2 text-sm text-start text-grey-900"
              >Email*</label
            >
            <input
              id="email"
              type="email"
              placeholder="name@email.com"
              v-model="email"
              class="flex items-center w-full px-5 py-4 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <label for="password" class="mb-2 text-sm text-start text-grey-900"
              >Password*</label
            >
            <input
              id="password"
              type="password"
              placeholder="Enter a password"
              v-model="password"
              class="flex items-center w-full px-5 py-4 mb-5 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <button
              type="submit"
              class="btn btn-primary w-full px-6 my-5 text-sm font-bold text-grey-900 md:w-96 rounded-2xl"
            >
              Sign Up
            </button>
            <div>
              <p class="text-sm leading-relaxed text-grey-900">
                Allready have an account?
                <NuxtLink to="/login" class="justify-self-end"
                  ><a class="font-bold text-grey-700">Login</a></NuxtLink
                >
              </p>
              <p class="text-sm leading-relaxed text-grey-900">
                <NuxtLink to="/mentions" class="justify-self-end"
                  ><a class="text-grey-700">Mentions légales et CGU</a>
                </NuxtLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFetchAPI } from "../composables/fetch.ts";

const nickName = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const signup = async () => {
  try {
    const response = await useFetchAPI<any>(
      "POST",
      "/auth/register",
      {
        nickname: nickName.value,
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        password: password.value,
      }
    );

    if (!response.ok) {
      console.log(response);
      return alert("Registration went wrong!");
    }
    return navigateTo("/login");
  } catch (error) {
    console.error(error);
  }
};
</script>
