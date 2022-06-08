import React, {FC, useCallback} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, IconButton, List} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Task} from './Task';

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (todoListID: string, title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = React.memo((props) => {
    console.log('TodoList')

    let tasks = props.tasks
    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todoListID)
    }, [props])
    const removeTask = useCallback((id: string) => {
        props.removeTask(id, props.todoListID)
    }, [props])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todoListID, title)
    }, [props])
    const changeFilter = useCallback((filter: FilterValuesType) => {
        props.changeFilter(filter, props.todoListID)
    }, [props])

    const tasksListItems = props.tasks.length
        ? tasks.map(t => <Task key={t.id}
                                          task={t}
                                          todoListID={props.todoListID}
                                          removeTask={removeTask}
                                          changeTaskStatus={props.changeTaskStatus}
                                          changeTaskTitle={props.changeTaskTitle}/>)
        : <span>Нет задач в списке</span>

    const allBtnColor = props.filter === 'all' ? 'secondary' : 'primary'
    const activeBtnColor = props.filter === 'active' ? 'secondary' : 'primary'
    const completedBtnColor = props.filter === 'completed' ? 'secondary' : 'primary'

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              setNewTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}
                            color={'secondary'}
                            size={'small'}>
                    <HighlightOffIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksListItems}
            </List>
            <div>
                <ButtonGroup size={'small'}
                             variant={'contained'}>
                    <Button color={allBtnColor}
                            onClick={() => changeFilter('all')}>Все
                    </Button>
                    <Button color={activeBtnColor}
                            onClick={() => changeFilter('active')}>В работе
                    </Button>
                    <Button color={completedBtnColor}
                            onClick={() => changeFilter('completed')}>Выполнены
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})