<script setup>
import { computed, ref } from 'vue';
import { useStore } from "../../store/store.js";
const main = useStore();

const props = defineProps({
    title: {
        type: String,
        required: false,
    },
    description: {
      type: String,
      required: false,
    },
    taskNo: {
      type: Number,
      required: false,
    },
    option: {
      type: String,
      required: false,
    }
});


const enteredTitle = !!props.title ? ref(props.title) : ref('');
const enteredDescription = !!props.description ? ref(props.description) : ref('');
const enteredOption = !!props.option ? ref(props.option) : ref('');

const emit = defineEmits(['toggle']);
const toggleDialog = () => {
    emit('toggle');
};

const edit = ref(true);
if (enteredOption.value === 'view') {
  edit.value = !edit.value;
}

const buttonText = computed(() => {
  if (enteredOption.value === 'add') {
    return {
      main: 'Add',
      cancel: 'Cancel'
    };
  } else if (enteredOption.value === 'edit') {
    return {
      main: 'Update',
      cancel: 'Cancel'
    };
  } else if (enteredOption.value === 'view') {
    return {
      main: 'Edit',
      cancel: 'Cancel'
    };
  }
});

const buttonFunction = async () => {
  if (enteredOption.value === 'add') {
    await main.addToDo({
      title: enteredTitle.value,
      description: enteredDescription.value,
    });
    toggleDialog();
  } else if (enteredOption.value === 'edit') {
    // console.log(props.taskNo);
    await main.updateToDo({
      taskNo: props.taskNo,
      title: enteredTitle.value,
      description: enteredDescription.value,
    });
  } else if (enteredOption.value === 'view') {
    // console.log(props.taskNo);
    edit.value = true;
    enteredOption.value = 'edit';
  }
};

</script>
<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div>
            <div class="mt-2">
              <div class="flex">

                <!-- <input type="checkbox"/> -->
              <!-- <h3 class="text-lg font-medium text-gray-900 ml-2 mb-2">
                {{ cardTitle }}
              </h3> -->
              </div>
              <input :disabled="!edit" type="text" v-model="enteredTitle" placeholder="Task name (display 30 characters)"  class="mb-2 w-full max-h-10 rounded-xl p-3 border border-gray-300" /><br>
              <div class="h-0.5 w-full bg-gray-100 mb-2" />
              <textarea :disabled="!edit" v-model="enteredDescription" class="w-full rounded-xl px-3 py-2 border border-gray-300 resize-none" rows="5" placeholder="Task description"></textarea>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-red-500 hover:text-white focus:bg-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="toggleDialog" >
            {{ buttonText.cancel }}
          </button>
          <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-slate-500 text-base font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition ease-in-out duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="buttonFunction">
            {{ buttonText.main}}
          </button> 
        </div>
      </div>
    </div>
  </div>
</template>