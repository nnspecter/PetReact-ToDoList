import React, { useContext } from 'react'
import { TaskContext } from '../../../context/NewTaskContext'
import TaskPreview from '../TaskPreview/TaskPreview'

const CurrentTasks = () => {
  const { tasks } = useContext(TaskContext)

  return (
    <div>
      <h3>Текущие задачи:</h3>
      {tasks.map((el) =>
        !el.state ? ( // если state === false
          <TaskPreview key={el.id} task={el}/>
        ) : null
      )}
    </div>
  )
}

export default CurrentTasks
