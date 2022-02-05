<script setup>
import { ref, reactive, computed } from 'vue';
import InputToDoVue from './InputToDo.vue';
import { useStore } from "../../store/store.js";
const main = useStore();

const props = defineProps({
    toDo: {
        type: Object,
        required: true
    }
});

const displayTitle = computed(()=>{
    if (!props.toDo.title) {
        return "";
    }
    return props.toDo.title.length > 30 ? props.toDo.title.substr(0,30).trim() + '...' : props.toDo.title;
});

const isDoingAction = ref(false);
const dialog = ref(false);
const mode = ref('');

const toggleDialog = (option) => {
    mode.value = option;
    dialog.value = !dialog.value;
};

const btnFunction = async (option) => {
    isDoingAction.value = true;
    if (option === 'edit') {
        toggleDialog('edit');
    } else if (option === 'delete') {
        await main.deleteToDo(props.toDo.task_no);
    } else if (option === 'finish') {
        if (!props.toDo.completed_at) {
            await main.finishToDo(props.toDo.task_no,'finish');
        } else {
            await main.finishToDo(props.toDo.task_no,'undo');
        }
    }
    isDoingAction.value = false;
};
</script>

<template>
    <div class="bg-white rounded-xl shadow-sm hover:shadow-lg w-full overflow-hidden container flow-root my-2 py-2 px-3">
        <div class="float-left flex mt-1">
            <input :checked="props.toDo.completed_at !== null" type="checkbox" class="mx-2 rounded-full w-5 h-5 mt-1" @click="btnFunction('finish')"/>
            <label data-tooltip-target="tooltip-default" class="text-lg hover:cursor-pointer" @click="toggleDialog('view')">{{ displayTitle }}</label>
            <div id="tooltip-default" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                view task details
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
        <div class="float-right flex space-x-2 text-center">
            <button :disabled="isDoingAction" type="button" class="text-white bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:ring-purple-300 transition ease-in-out duration-200 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center" @click="btnFunction('edit')">   
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="mb-0.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
            </button>  
            <button :disabled="isDoingAction" type="button" class="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-rose-200 transition ease-in-out duration-200 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center" @click="btnFunction('delete')">   
                <div  v-if="!isDoingAction">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                </div>
                <div v-else>
                    <svg role="status" class="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    
                </div>
            </button>       
        </div>
    </div>
    <InputToDoVue v-if="dialog" :title="props.toDo.title" :description="props.toDo.description" :taskNo="props.toDo.task_no" @toggle="toggleDialog" :option="mode" />
</template>