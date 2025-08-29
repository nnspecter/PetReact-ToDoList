import React, { createContext, useCallback, useMemo, useState } from 'react'

export const TaskContext = createContext<any>(null);

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
    type Task = {
        id: string,
        task: string,
        state: boolean,
    }
    
    const [tasks, setTasks] = useState<Task[]>([]);
   
    const addTask = useCallback((newTask: string) => {
        const cloneTask = tasks.find((el) => el.task === newTask);
        if (cloneTask) return "Такая задача есть";
        if(newTask.trim() === "") return "Поле пустое";
        
        setTasks((prev) => [
            ...prev,
            { id: crypto.randomUUID(), task: newTask, state: false }
        ]);
        console.log("Добавлено");
        return true;

    }, [tasks]); // зависимость tasks

    const handleChange = useCallback((taskId: string) => {
        setTasks((prev) => {
            const taskExists = prev.some(el => el.id === taskId);
            if (!taskExists) {
                console.log("Ошибка поиска id");
                return prev; 
            }
            
            return prev.map((el) =>
                el.id === taskId ? { ...el, state: !el.state } : el
            );
        });
    }, []); // нет зависимостей

    const handleDelete = useCallback((taskId: string) => {
        setTasks((prev) => prev.filter((el) => el.id !== taskId));
    }, []); // нет зависимостей

    const contextValue = useMemo(() => ({
        tasks,
        addTask,
        handleChange,
        handleDelete
    }), [tasks, addTask, handleChange, handleDelete]);

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider