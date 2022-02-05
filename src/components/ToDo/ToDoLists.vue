<script setup>
import ToDoCard from './ToDoCard.vue';
import InputToDo from './InputToDo.vue';
import { ref, onMounted } from "vue";
const elTitle = "To-do lists";
const isLoading = ref(true);
import { useStore } from "../../store/store.js";
import LoadingCard from './LoadingCard.vue';
const main = useStore();
onMounted(async () => { // define async function onmount to render component
  await main.getToDoLists()
  .then(res=> {
      // console.log(res);
    if (res !== null) {
      toDoLists.value = res;
    } else {
      toDoLists.value = [];
    }
  })
  isLoading.value = false;
});
const toDoLists = ref([]);
main.$onAction(({name, store, after}) => { //subscribe to store action
  isLoading.value = true;
//   console.log('action name',name)
  after((res)=> {
    // console.log('Res', res);
    if (name === 'filterNull') {
      toDoLists.value = res;
      isLoading.value = false;
    }
  });
});

const dialog = ref(false);
const option = ref('');
const toggleDialog = (mode) => {
    option.value = mode;
    dialog.value = !dialog.value;
};
</script>

<template>
    <div class="bg-gray-300 rounded-xl px-3 py-2">
        <div class="flow-root">
            <h3 class="text-2xl font-semibold float-left">{{ elTitle }}</h3>
            <div class="float-right flex">
              <!-- <button class="bg-indigo-600 hover:bg-indigo-700 transition duration-200 focus:ring-4 focus:ring-gray-300 rounded-lg text-white mt-1 mr-1 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </button> -->
              <button class="bg-gray-700 hover:bg-gray-800 transition duration-200 focus:ring-4 focus:ring-gray-300 rounded-lg text-white mt-1 mr-1 p-2" @click="toggleDialog('add')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
        </div>
        <LoadingCard v-if="isLoading"/>
        <p v-else-if="toDoLists.length === 0 && !isLoading">Nothing here ;(</p>
        <ToDoCard v-for="toDo in toDoLists" :key="toDo.task_no" :toDo="toDo" v-else-if="toDoLists.length !== 0 && !isLoading"/> 
    </div>
    <InputToDo 
        v-if="dialog"
        :option="option"
        @toggle="toggleDialog" />
</template>