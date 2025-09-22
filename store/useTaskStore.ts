import React from 'react'
import {create} from "zustand"
type Task = {
        id: string,
        task: string,
        state: boolean,
    }
    
interface TaskStore {
    tasks: Task[],
    filter: "all" | string, 
    changeFilter: (newFilter: string) => void,
    addTask: (newTask: string) => boolean | string,
    handleChange: (taskId: string) => void,
    handleDelete: () => void,
}

const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    filter: "all",

    changeFilter: (newFilter: string) => { 
        set({filter: newFilter});
        console.log(newFilter);
    },

    addTask: (newTask: string) => {
        const cloneTask = get().tasks.find((el) => el.task === newTask);
        if (cloneTask) return "Такая задача есть";
        if(newTask.trim() === "") return "Поле пустое";
        set({tasks:[
            ...get().tasks,
                {id: crypto.randomUUID(), task: newTask, state: false }
        ]});
        console.log("Добавлено");
        return true;
        },

    handleChange: (taskId: string) => {
        set((state)=>{
            const taskExist = state.tasks.some(el=> el.id === taskId);
            if (taskExist) {console.log("ошибка поиска по id"); return{}};
            return {tasks: state.tasks.map(el=>
                el.id === taskId ? {...el, state: !el.state} : el)}
        })
    },

    handleDelete: () =>{
        set((state) => {return { tasks: state.tasks.filter(el => el.state === true)}})
    },
    
                
}))