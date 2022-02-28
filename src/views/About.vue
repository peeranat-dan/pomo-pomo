<script setup>
const openNewTab= (url) => {
  window.open(url)
};
</script>

<template>
  <div class="w-full text-center flex my-auto">
    <div class="mx-auto space-y-5">
      <h1 class="text-5xl font-bold mb-12">About PoMo.</h1>
      <p class="text-xl">PoMo. is a timer that used Pomodoro technique. Creator just don't want to use others Pomodoro timer, so he created a new one.</p>
      <p class="text-xl">Also, creator is developing developer skills, so he tried to write his own Pomodoro timer using Vue 3 + Pinia + Supabase.</p>
      <div class="w-full border-2 border-gray-900 my-12"></div>
      <p class="text-2xl">Want to know more about the creator? Click <a class="font-bold text-purple-button hover:bg-purple-button hover:text-white transition duration-300 cursor-pointer" @click="openNewTab('https://peeranatdanaidusadeekul.live/')">here</a></p>
      <div class="mt-12">
        <router-link to="/home" class="bg-purple-card text-white hover:bg-purple-800 focus:bg-purple-900 rounded-xl p-3">Back to home</router-link>

      </div>
    </div>
  </div>
</template>