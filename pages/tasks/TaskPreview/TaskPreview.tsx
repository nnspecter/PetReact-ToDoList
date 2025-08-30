import React, { useContext } from 'react'
import styles from "./TaskPreview.module.scss"
import { Checkbox } from '@mui/material'
import { TaskContext } from '../../../context/NewTaskContext';
import { BiCircle } from "react-icons/bi";
import { BiChevronDownCircle } from "react-icons/bi";
const TaskPreview = ({ task }) => { 
    const { handleChange } = useContext(TaskContext);
    if (!task) {
        return <></>
    }
    
    return (
        <div className={styles.taskContainer}>
            <div className={styles.currentTask}>
                <Checkbox
                    icon={<BiCircle style={{ fontSize: "32px" }} />} 
                    checkedIcon={<BiChevronDownCircle style={{ fontSize: "32px" }} />}
                    checked={task.state}
                    onChange={() => handleChange(task.id)}
                    sx={{
                        color: "#9e9e9e", // цвет иконки по умолчанию
                        '&.Mui-checked': {
                        color: "#69c46eff", // цвет при нажатии (checked)
                        },
                    }}
                />
                <div className={`${styles.taskText} ${task.state ? styles.completed : ""}`}>
                    
                        {task.task}
                    
                </div>
                
            </div>
    </div>
    )
}

export default TaskPreview