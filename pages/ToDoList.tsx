import React from 'react'
import AllTasks from './tasks/all/AllTasks'
import Input from './Input/Input'
import styles from "./ToDoList.module.scss"
import { AnimatePresence, motion } from 'motion/react'
import FiltersPanel from './filters/FiltersPanel'
const ToDoList = () => {
  return (
    <div className={styles.ToDoList}>
      <AnimatePresence>
        <Input/>
        <motion.div
        layout  
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2}}
          >
          <div className={styles.toDo}>
              <AllTasks/>
              <FiltersPanel/>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ToDoList