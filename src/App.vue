<script setup>
import { onBeforeMount } from "vue";
import { onBeforeRouteLeave } from 'vue-router';
import { useStore } from "./store/store.js";

import TopBar from "./components/UI/TopBar.vue";
const main = useStore();
onBeforeMount(()=> {
  main.init();


});

</script>

<template>
  <div class="h-screen w-screen items-center grid">
<!--    <TopBar />-->

    <div class="rounded-xl bg-white shadow-lg p-5 sm:p-12 mx-5" style="height: 90%">
      <div class="flex space-x-12 mb-12 items-center">
        <h1 class="text-3xl font-black">PoMo.</h1>
        <div class="flex space-x-12 invisible sm:visible">
          <router-link class="hover:text-purple-pomo transition duration-150" to="/home">Home</router-link>
          <router-link class="hover:text-purple-pomo transition duration-150" to="/about">About PoMo.</router-link>
        </div>
      </div>
    <router-view />
    </div>

  </div>
</template>

<style>
html, body {
  font-family: 'Manrope', sans-serif;
  background-color: #4b406a;
}
</style>


