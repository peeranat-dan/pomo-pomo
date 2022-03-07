<script setup>
import { ref, defineEmits } from 'vue';
import ToDoCard from './ToDoCard.vue';
import LoadingCard from './LoadingCard.vue';
import { useStore } from '../../store/store.js';
import { onMounted } from 'vue';
const main = useStore();
const archiveToDo = ref([]);
const isLoading = ref(true);
const isArchive = true;
onMounted(async () => {
    await main.getArchiveToDoLists()
    .then(res => {
        // console.log(res);
        if (res.length === 0) {
            archiveToDo.value = [];
        } else {
            archiveToDo.value = res;
        }
        isLoading.value = false;
    })
});
const emit = defineEmits(['toggleArchive']);
const toggleDialog = () => {
    emit('toggleArchive');
};
</script>

<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-gray-200 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div>
              <h3 class="text-2xl font-semibold mb-8">Done today</h3>
              <LoadingCard v-if="isLoading" />
              <ToDoCard v-for="toDo in archiveToDo" :toDo="toDo" :isArchive="isArchive" />
            <!-- <div class="mt-2">
              <input v-if="!errorTitle" :disabled="!edit" type="text" v-model="enteredTitle" placeholder="Task name (display 30 characters) *"  class="mb-2 w-full max-h-10 rounded-xl p-3 border border-gray-300" />
              <input v-else v-model="enteredTitle" placeholder="Task name (display 30 characters) *"  class="mb-2 w-full max-h-10 rounded-xl p-3 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500" />

              <div class="h-0.5 w-full bg-gray-100 mb-2" />
              <textarea :disabled="!edit" v-model="enteredDescription" class="w-full rounded-xl px-3 py-2 border border-gray-300 resize-none" rows="5" placeholder="Task description"></textarea>
            </div> -->
            <p v-if="!isLoading && archiveToDo.length === 0">No task here! Good Job!</p>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-red-500 hover:text-white focus:bg-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="toggleDialog" >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>