import React, { useContext, useState } from 'react'
import styles from "./input.module.scss"
import { Button, TextField } from '@mui/material';
import { useTaskStore } from '../../zustandStore/useTaskStore';
const Input = () => {
  const [text, setText] = useState("");
  const{addTask} = useTaskStore();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask(text);
      setText("");
    }
  };

  return (
    <div className={styles.inputLine}>
      <div className={styles.inputButton}>
        <input 
          type="text" 
          value={text} 
          placeholder='Введите задачу' 
          onChange={(e)=>{setText(e.target.value)}}
          onKeyDown={handleKeyPress}/>
          <Button variant='outlined' onClick={() => {addTask(text); setText("")}}>Добавить</Button>
      </div>
      <div className={styles.line}></div>
    </div>
  )
}

export default Input