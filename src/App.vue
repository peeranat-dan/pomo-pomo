<script setup>
import { onBeforeMount } from "vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useStore } from "./store/store.js";
const main = useStore();
onBeforeMount(()=> {
  main.init();
});
</script>

<template>
  <div class="bg-slate-700 overflow-hidden h-screen">
    <router-view />
  </div>
</template>

<style>

</style>
