import React, {ChangeEvent} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {TodoListType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './reducers/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer';
import {changeFilterAC, changeTodolistTitleAC, removeTodoListAC} from './reducers/todolists-reducer';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    todoList: TodoListType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoListWithRedux: React.FC<TodoListPropsType> = ({todoList}) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoList.id])
    let dispatch = useDispatch()


    if (todoList.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (todoList.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const removeTodoList = () => {
        dispatch(removeTodoListAC(todoList.id))
    }
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todoList.id))
    }
    const removeTask = (id: string) => {
        dispatch(removeTaskAC(id, todoList.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todoList.id, title))
    }
    const changeFilter = (filter: FilterValuesType) => {
        dispatch(changeFilterAC(todoList.id, filter))
    }

    const tasksListItems = tasks.length
        ? tasks.map(t => {

            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, todoList.id))
            }
            const changeTaskTitle = (title: string) => {
                dispatch(changeTaskTitleAC(t.id, title, todoList.id))
            }
            const taskClasses = t.isDone ? 'is-done' : '';
            return (
                <ListItem key={t.id}
                          alignItems={'center'}
                          style={{padding: '0'}}
                          disableGutters
                          divider>
                    <Checkbox
                        color="primary"
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                        size={'small'}
                    />

                    <span className={taskClasses}>
                        <EditableSpan title={t.title}
                                      setNewTitle={changeTaskTitle}/>
                    </span>
                    <IconButton onClick={() => removeTask(t.id)}
                                size={'small'}
                                color={'secondary'}>
                        <HighlightOffIcon/>
                    </IconButton>
                </ListItem>
            )
        })
        : <span>Нет задач в списке</span>

    const allBtnColor = todoList.filter === 'all' ? 'secondary' : 'primary'
    const activeBtnColor = todoList.filter === 'active' ? 'secondary' : 'primary'
    const completedBtnColor = todoList.filter === 'completed' ? 'secondary' : 'primary'

    return (
        <div>
            <h3>
                <EditableSpan title={todoList.title}
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
    );
};

