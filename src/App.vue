<script setup>
import { onBeforeMount } from "vue";
import { useStore } from "./store/store.js";
import TopBar from "./components/UI/TopBar.vue";
const main = useStore();
onBeforeMount(()=> {
  main.init();
});
</script>

<template>
  <div class="bg-slate-700 overflow-hidden h-screen">
    <TopBar />
    <router-view />
  </div>
</template>

<style>

</style>
