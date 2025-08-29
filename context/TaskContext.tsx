import React, { createContext, useState } from 'react'
export const OldTaskContext = createContext<any>(null); 

const OldTaskContextProvider = ({children}) => {
    const[allTasks, setAllTasks] = useState();
    const[tasks, setTasks] =useState([]);
    const[comTasks, setComTasks] = useState([]);

    const addTask = (newTask: any) =>{
        setTasks((prev)=>[...prev, newTask]);
    }

    const addToCompleteTask = (taskId: Number) =>{
        const taskToComplete = tasks.find((el)=> el.id === taskId)
        if(!taskToComplete) return; 
        setComTasks((prev)=>[...prev, taskToComplete]);
        setTasks((prev)=> prev.filter((el)=> el.id !==taskId));
    }

    const putAwayTask = (taskId: Number) => {
        const completeToTask = comTasks.find((el) => el.id === taskId )
        if(!completeToTask) return;
        setTasks((prev)=>[...prev, tasks]);
        setComTasks((prev)=> prev.filter((el)=> el.id !== taskId));
    }

  return (
    <OldTaskContext.Provider value={{tasks, comTasks}}>
        {children}
    </OldTaskContext.Provider>
  )
}

export default OldTaskContextProvider