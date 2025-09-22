import React, { useContext } from 'react'
import styles from "./FiltersPanel.module.scss"
import { Button } from '@mui/material';
import { useTaskStore } from '../../zustandStore/useTaskStore';
const FiltersPanel = () => {
    const{changeFilter, filter, handleDelete} = useTaskStore();
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