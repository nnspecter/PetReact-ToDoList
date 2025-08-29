import React, { useContext } from 'react'
import styles from "./TaskPreview.module.scss"
import { Checkbox } from '@mui/material'
import { TaskContext } from '../../../context/NewTaskContext';

const TaskPreview = ({ task }) => { 
    const { handleChange } = useContext(TaskContext);
    
    
    return (
        <div className={styles.currentTask}>
            {task.task}
            <Checkbox 
                checked={task.state} 
                onChange={() => handleChange(task.id)} 
            />
        </div>
    )
}

export default TaskPreview