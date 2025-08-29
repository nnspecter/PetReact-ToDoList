import React, { useContext } from 'react'
import { TaskContext } from '../../../context/NewTaskContext'
import TaskPreview from '../TaskPreview/TaskPreview'

const CompleteTasks = () => {
  const { tasks } = useContext(TaskContext)

  return (
    <div>
      <h3>Выполненные задачи:</h3>
      {tasks.map((el) =>
        el.state ? ( // если state === true
          <TaskPreview key={el.id} task={el}/>
        ) : null
      )}
    </div>
  )
}

export default CompleteTasks