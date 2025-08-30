import React, { useContext } from 'react'
import styles from "./FiltersPanel.module.scss"
import { TaskContext } from '../../context/NewTaskContext'
import { Button } from '@mui/material';
const FiltersPanel = () => {
    const{changeFilter, handleDelete, filter} = useContext(TaskContext);
  return (
    <div className={styles.filterPanel}>
        <div className={styles.fiterButtons}>
            <Button 
                variant='outlined' 
                onClick={()=>changeFilter("all")}
                className={filter === 'all' ? styles.btnActive : undefined}>
                    Все
            </Button>
            <Button 
                variant='outlined' 
                onClick={()=>changeFilter("active")}
                className={filter === 'active' ? styles.btnActive : undefined}>
                    Активные
            </Button>
            <Button 
                variant='outlined'
                onClick={()=>changeFilter("complete")}
                className={filter === 'complete' ? styles.btnActive : undefined}>
                    Завершенные
            </Button>
            
            
        </div>
        <Button variant='outlined' onClick={()=>handleDelete()}>Очистить выполненные</Button>
    </div>
  )
}

export default FiltersPanel