
import React from 'react'
import AllTasks from './tasks/all/AllTasks'
import CurrentTasks from './tasks/current/CurrentTasks'
import CompleteTasks from './tasks/complete/Completetasks'
import Input from './Input/Input'

const ToDoList = () => {
  return (
    <div>
        <Input/>
        <AllTasks/>
        <CurrentTasks/>
        <CompleteTasks/>
    </div>
  )
}

export default ToDoList