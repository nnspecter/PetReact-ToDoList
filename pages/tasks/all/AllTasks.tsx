import React, { useContext } from 'react'
import { TaskContext } from '../../../context/NewTaskContext'
import TaskPreview from '../TaskPreview/TaskPreview';

const AllTasks = () => {
    const{tasks} = useContext(TaskContext);
  return (
    <div>
        <h3>Все задачи:</h3>
        {tasks.map((el)=>
            <TaskPreview key={el.id} task={el}/>
        )}
    </div>
  )
}

export default AllTasks