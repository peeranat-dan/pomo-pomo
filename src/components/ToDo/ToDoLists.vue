<script setup>
import ToDoCard from './ToDoCard.vue';
import InputToDo from './InputToDo.vue';
import { ref, onMounted } from "vue";
const elTitle = "To-do lists";
const isLoading = ref(true);
import { useStore } from "../../store/store.js";
import LoadingCard from './LoadingCard.vue';
import ArchiveDialog from './ArchiveDialog.vue';
const main = useStore();

const toDoLists = ref([]);onMounted(async () => { // define async function onmount to render component
  await main.getToDoLists(8)
      .then(res=> {
        if (res != null) {
          toDoLists.value = res;
        } else {
          toDoLists.value = [];
        }
      })
  isLoading.value = false;
});

main.$onAction(({name, store, after}) => { //subscribe to store action
  
//   console.log('action name',name)
  after((res)=> {
    // console.log('Res', res);
    if (name === 'filterNull') {
      isLoading.value = true;
      toDoLists.value = res.slice(0,8);
      
    }
    isLoading.value = false;
  });
});

const dialog = ref(false);
const archiveDialog = ref(false);
const option = ref('');
const toggleDialog = (mode) => {
    option.value = mode;
    dialog.value = !dialog.value;
};
const toggleArchiveDialog = () => {
  archiveDialog.value = !archiveDialog.value;
};

const today = ref(main.tomorrow.toISOString().substring(0,10));
</script>

<template>
    <div class="bg-pink-card shadow-lg rounded-xl pl-5 pr-3 py-4 h-fit">
        <div class="flow-root mb-5">
          <div class="float-left flex items-center space-x-3 select-none">
            <h3 class="text-2xl font-bold text-white">{{ elTitle }} </h3>
            <div class="bg-white text-purple-pomo font-bold rounded px-3 py-2">{{ today }}</div>
          </div>

            <div class="float-right flex">
              <button class="bg-pink-button-normal hover:bg-pink-button-hover transition duration-200 focus:ring-4 focus:ring-pink-button-normal focus:ring-opacity-30 rounded-lg text-white mt-1 mr-1 p-2 shadow-lg" @click="toggleArchiveDialog">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </button>
              <button class="bg-purple-button hover:bg-gray-800 transition duration-200 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-30 rounded-lg text-white mt-1 mr-1 p-2 shadow-lg" @click="toggleDialog('add')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

        </div>
        <LoadingCard v-if="isLoading"/>
        <p class="text-white" v-else-if="toDoLists.length === 0 && !isLoading">Nothing here ;(</p>
        <ToDoCard v-for="toDo in toDoLists" :key="toDo.task_no" :toDo="toDo" v-else-if="toDoLists.length !== 0 && !isLoading"/> 
    </div>
    <InputToDo 
        v-if="dialog"
        :option="option"
        @toggle="toggleDialog" />
    <ArchiveDialog
        v-if="archiveDialog"
        @toggleArchive="toggleArchiveDialog" />
</template>