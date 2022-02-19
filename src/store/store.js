import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase.js";

export const useStore = defineStore('main', {
    state: () => {
        return {
            toDoLists: [],
            archivedToDoLists: [],
            id: '',
        };
    },
    getters: {

    },
    actions: {
        randomId(length) {
            let result = '';
            let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charLength = char.length;
            for (let i = 0; i < length ;i++) {
                result += char.charAt(Math.floor(Math.random() * charLength));
            }
            return result;
        },
        token() {
            // console.log("token");
            const token = this.randomId(30);
            localStorage.setItem('id', token);
            this.id = token;
            // console.log(this.id)
            return this.id;
        },
        init() {
            this.id = !!localStorage.getItem('id') ? localStorage.getItem('id') : this.token();
        },
        filterNull(data, column) {
            const filteredData = data.filter(record => record[column] === null);
            return filteredData;
        },
        filterNotNull(data, column) {
            const filteredData = data.filter(record => record[column] !== null);
            return filteredData;
        },
        async getToDoLists() {
            // const today = new Date();
            // console.log(today)
            const { data, error } = await supabase
                .from('to_do_lists')
                .select('*')
                .eq('user_id',this.id)
                // .like('created_at', today)

                .order('created_at', { ascending: true })
            if (error) {
                this.toDoLists = [];
                return;
            }
            const filteredData = this.filterNull(data, 'deleted_at');
            const filteredAnotherData = this.filterNull(filteredData, 'completed_at');
            this.toDoLists = filteredAnotherData;
            // console.log(filteredData)
            return filteredAnotherData;
        },
        async addToDo(payload) {
            await supabase
                .from('to_do_lists')
                .insert([
                    { title: payload.title, completed_at: null, deleted_at: null, description: payload.description ? payload.description : null, user_id: this.id },
                ])       
            await this.getToDoLists();
            
        },
        async deleteToDo(taskNo) {
            await supabase
                .from('to_do_lists')
                .update({ deleted_at: new Date() })
                .eq('task_no', taskNo);
            await this.getToDoLists();
        },
        async finishToDo(taskNo, mode) {
            const updateData = mode === 'finish' ? new Date(): null;
            await supabase
                .from('to_do_lists')
                .update({ completed_at: updateData })
                .eq('task_no', taskNo);
            await this.getToDoLists();
        },
        async updateToDo(payload) {
            await supabase
                .from('to_do_lists')
                .update({ title: payload.title, description: payload.description })
                .eq('task_no', payload.taskNo);
            await this.getToDoLists();
        },
        async getArchiveToDoLists() {
            const { data, error } = await supabase
                .from('to_do_lists')
                .select('*')
                .eq('user_id',this.id)
                .is('deleted_at', null)
                .not('completed_at', 'is', null)
                .order('created_at', { ascending: true })
            this.archivedToDoLists = data;
            return data;
        },
    }
});

