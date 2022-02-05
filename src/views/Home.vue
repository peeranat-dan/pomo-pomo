<script setup>
import PomodoroTimerVue from '../components/Pomodoro/PomodoroTimer.vue';
import ToDoLists from '../components/ToDo/ToDoLists.vue';
</script>
<template>
<div class="lg:w-[40rem] w-full mx-auto">
    <div class="container mx-auto">
        <PomodoroTimerVue />
    </div>
    <div class="container mt-3 mx-auto">
        <ToDoLists />
    </div>

</div>
</template>