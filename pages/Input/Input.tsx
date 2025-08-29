import React, { useContext, useState } from 'react'
import styles from "./input.module.scss"
import { TaskContext } from '../../context/NewTaskContext';
const Input = () => {
  const [text, setText] = useState("");
  const{addTask} = useContext(TaskContext);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask(text);
    }
  };

  return (
    <div className={styles.input}>
        <input 
        type="text" 
        value={text} 
        placeholder='Введите задачу' 
        onChange={(e)=>{setText(e.target.value)}}
        onKeyDown={handleKeyPress}/>
        <button onClick={() => addTask(text)}>Добавить</button>
    </div>
  )
}

export default Input