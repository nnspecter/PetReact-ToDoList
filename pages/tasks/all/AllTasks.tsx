import React, { useContext } from 'react'
import { TaskContext } from '../../../context/NewTaskContext'
import TaskPreview from '../TaskPreview/TaskPreview'
import styles from "./AllTasks.module.scss"
import { AnimatePresence, motion } from 'motion/react'

const AllTasks = () => {
  const { tasks, filter } = useContext(TaskContext)

  let filteredTasks = tasks

  if (filter === "complete") {
    filteredTasks = tasks.filter(el => el.state)
  } else if (filter === "active") {
    filteredTasks = tasks.filter(el => !el.state)
  }

  return (
    <div className='TaskList'>
      {tasks.length < 1 && filter==="all" && (
        <p className={styles.textNone}>Вы не добавили ни одной задачи</p>
      )}

      {filter === "all" && tasks.length > 0 && (
        <AnimatePresence>
          {tasks.map((el) => (
            <motion.div
              key={el.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
            >
              <TaskPreview task={el} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {filter === "complete" && (
        filteredTasks.length > 0 ? (
          <AnimatePresence>
            {filteredTasks.map((el) => (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
              >
                <TaskPreview task={el} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className={styles.textNone}>Нет завершенных задач</p>
        )
      )}

      {filter === "active" && (
        filteredTasks.length > 0 ? (
          <AnimatePresence>
            {filteredTasks.map((el) => (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
              >
                <TaskPreview task={el} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className={styles.textNone}>Нет активных задач</p>
        )
      )}
    </div>
  )
}

export default AllTasks
