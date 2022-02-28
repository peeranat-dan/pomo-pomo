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
          playAudio(finishAudio);
          alert('Break')
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
          playAudio(finishAudio);
          alert('continue');
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
          playAudio(finishAudio);
          alert('finish one pomodoro!');
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
    return "red-pomo";
  } else if (option === 'sBreak') {
    return "blue-pomo";
  } else if (option === 'lBreak') {
    return "green-pomo";
  }
};
const loop = watchEffect(() => {
  if (n.value === timeSet.value.length) {
    n.value = 0;
    // console.log('loop')
  }
});

const playAudio = (url) => {
  const audio = new Audio(url);
  audio.play();
};

const finishAudio = 'https://qjkoynljumxyjpethyls.supabase.in/storage/v1/object/sign/sound/i-did-it-message-tone.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb3VuZC9pLWRpZC1pdC1tZXNzYWdlLXRvbmUubXAzIiwiaWF0IjoxNjQ2MDM3NjM1LCJleHAiOjE5NjEzOTc2MzV9.N8eBdT-Z0akz6jZx0ZZX-kMI6haUYEx40J_-VAsXO20';
</script>

<template>
    <div @keydown.enter="start(timeSet[n])" class="mx-auto">
      <div class="rounded-xl w-full">
        <div class="mx-auto">
          <div class="mx-auto mt-3">
            <h1 class="text-4xl text-center font-bold text-black select-none">Timer</h1>
          </div>
          <div class="rounded-full flex w-[15rem] h-[15rem] mx-auto mt-8 mb-12 shadow-lg" :class="'bg-' + barColor(timeSet[n])">
            <div class="rounded-full flex bg-white w-[12rem] h-[12rem] mx-auto my-auto">
            <p class="text-center font-bold text-6xl mx-auto my-auto select-none" :class="'text-'+ barColor(timeSet[n])">{{ timeDisplay(timeSet[n]) }}</p>
            </div>
          </div>
          <div class="flex justify-center mb-3">
            <button  @click="start(timeSet[n])" class="bg-purple-pomo  hover:bg-purple-button transition duration-300 rounded-full py-2 px-16 mx-1 text-white hover:text-white text-2xl" v-if="!timerRunning">
              Start
            </button>
            <button @click="stop" class="bg-red-pomo hover:bg-red-800 focus:bg-red-900 transition duration-300 rounded-full py-2 px-16 mx-1 text-white hover:text-white text-2xl" v-else>
              Stop
            </button>
          </div>
        </div>

      </div>
    </div>
</template>