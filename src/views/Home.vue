<script setup>
import PomodoroTimerVue from '../components/Pomodoro/PomodoroTimer.vue';
import ToDoLists from '../components/ToDo/ToDoLists.vue';
import {onBeforeRouteLeave, onBeforeRouteUpdate} from "vue-router";

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
      "Do you really want to leave this site? (Timer will be reset)"
  )
  return answer;
})

onBeforeRouteUpdate( (to, from) => {
  const answer = window.confirm(
      "Do you really want to leave this site? (Timer will be reset)"
  )
  return answer;
})
</script>
<template>
<div class="w-full mx-auto flex">
<!--    <div class="container mx-2">-->
<!--        <PomodoroTimerVue />-->
<!--    </div>-->
<!--    <div class="container mx-2">-->
<!--        <ToDoLists />-->
<!--    </div>-->
  <div class="w-full">

    <div class="sm:flex">
      <div class="container w-full">
        <PomodoroTimerVue />
      </div>
      <div class="container w-full invisible sm:visible">
        <ToDoLists />
      </div>

    </div>
  </div>

</div>
</template>