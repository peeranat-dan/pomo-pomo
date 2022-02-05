<script setup>
import { ref, reactive, watchEffect } from 'vue';
// initialize variables
const timeSet = ref(['pomodoro', 'sBreak', 'pomodoro','sBreak', 'pomodoro', 'sBreak', 'pomodoro', 'lBreak']);
const timer = ref(null);
const timerRunning = ref(false);
const timeRunning = reactive({
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900,
});
const timeReference = { // use for a base time
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900,
};
const n = ref(0);

// initialize function
const timeDisplay = (option) => { // display time as xx:xx
    let time;
    if (option === 'pomodoro') {
        time = timeRunning.pomodoro;
    } else if (option === 'sBreak') {
        time = timeRunning.shortBreak;
    } else if (option === 'lBreak') {
        time = timeRunning.longBreak;
    }
    const hour =  time / 60 < 10 ? '0' + Math.floor(time/60): Math.floor(time/60);
    const minute =  time % 60 < 10 ? '0' + time % 60 : time % 60;
    return hour + ':' + minute;
}

const start = (option) => {
  timerRunning.value = true;
  // console.log(option)
  if (!timer.value) {
    if (option === 'pomodoro') {
      timer.value = setInterval(() => {
        if (timeRunning.pomodoro > 0) {
          timeRunning.pomodoro--;
        } else {
          clearInterval(timer.value);
          timer.value = null;
          timeRunning.pomodoro = timeReference.pomodoro;
          n.value ++;
          timerRunning.value = false;
        }
      }, 1000)
    } else if (option === 'sBreak') {
      // console.log(timeRunning.shortBreak)
      timer.value = setInterval(() => {
        if (timeRunning.shortBreak > 0) {
          timeRunning.shortBreak--;
        } else {
          clearInterval(timer.value);
          timer.value = null;
          timeRunning.shortBreak = timeReference.shortBreak;
          n.value ++;
          timerRunning.value = false;
        }
      }, 1000)
    } else if (option === 'lBreak') {
      timer.value = setInterval(() => {
        if (timeRunning.longBreak > 0) {
          timeRunning.longBreak--;
        } else {
          clearInterval(timer.value);
          timer.value = null;
          timeRunning.longBreak = timeReference.longBreak;
          n.value ++;
          timerRunning.value = false;
        }
      }, 1000)
    }
  }
};
const stop = () => {
  timerRunning.value = false;
  clearInterval(timer.value);
  timer.value = null;
};

const typeDisplay = (option) => {
  if (option === 'pomodoro') {
    return "Pomodoro";
  } else if (option === 'sBreak') {
    return "Short Break";
  } else if (option === 'lBreak') {
    return "Long Break";
  }
};
const width = (option) => {
  if (option === 'pomodoro') {
    const time = (timeRunning.pomodoro/timeReference.pomodoro)*100;
    return "width:" + time + "%";
  } else if (option === 'sBreak') {
    const time = (timeRunning.shortBreak/timeReference.shortBreak)*100;
    return "width:" + time + "%";
  } else if (option === 'lBreak') {
    const time = (timeRunning.longBreak/timeReference.longBreak)*100;
    return "width:" + time + "%";
  }
};
const barColor = (option) => {
  if (option === 'pomodoro') {
    return "bg-red-500";
  } else if (option === 'sBreak') {
    return "bg-indigo-500";
  } else if (option === 'lBreak') {
    return "bg-blue-400";
  }
};
const loop = watchEffect(() => {
  if (n.value === timeSet.value.length) {
    n.value = 0;
    // console.log('loop')
  }
});
</script>

<template>
    <div>
      <div class="bg-gray-900 w-full h-fit rounded-xl shadow-md mx-auto p-3 mt-3">
        <div class="mx-auto w-full">
          <div class="mx-auto">
            <h1 class="text-3xl text-center mt-3 font-bold text-white select-none">Timer</h1>
            <p class="text-center text-gray-100 select-none">Session: {{ typeDisplay(timeSet[n]) }}</p>
            <p class="text-center text-7xl mt-2 mb-5 text-white select-none">{{ timeDisplay(timeSet[n]) }}</p>
          </div>
          <div class="bg-gray-200 w-full h-2.5 my-3">
            <div class="h-2.5 my-3" :class="barColor(timeSet[n])" :style="width(timeSet[n])"></div>
          </div>
          <div class="flex justify-center mt-2 mb-3">
            <button @click="start(timeSet[n])" class="bg-red-500 hover:bg-red-600 transition duration-200 rounded-lg p-2 mx-1 text-white" v-if="!timerRunning">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
            </button>
            <button @click="stop" class="bg-stone-500 hover:bg-stone-600 transition duration-200 rounded-lg p-2 mx-1 text-white" v-else>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>