import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase.js";

export const useStore = defineStore('main', {
    state: () => {
        return {
            toDoLists: [],
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
        async getToDoLists() {
            const { data, error } = await supabase
                .from('to_do_lists')
                .select('*')
                .eq('user_id',this.id)
                .order('created_at', { ascending: true })
            const filteredData = this.filterNull(data, 'deleted_at');
            this.toDoLists = filteredData;
            // console.log(filteredData)
            return filteredData;
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

    }
});

