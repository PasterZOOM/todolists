import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTiile: string) => void
}

export function Todolist(props: PropsType) {
    let [newTiile, setNewTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(newTiile)
        setNewTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFiltlerHandlerUniversal = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    const removeTasksHandler = (tId: string) => {
        props.removeTask(tId)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTiile} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <Button name={'+'} callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return (<li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'X'} callBack={() => removeTasksHandler(t.id)}/>
                    </li>)
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => changeFiltlerHandlerUniversal('all')}/>
            <Button name={'Active'} callBack={() => changeFiltlerHandlerUniversal('active')}/>
            <Button name={'Completed'} callBack={() => changeFiltlerHandlerUniversal('completed')}/>
        </div>
    </div>
}
