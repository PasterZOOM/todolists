import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
    changeTaskTitleStatus: (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (todoListID: string, title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = (props) => {

    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const removeTask = (id:string) => {
        props.removeTask(id, props.todoListID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todoListID, title)
    }
    const changeFilter = (filter: FilterValuesType) => {
        props.changeFilter(filter, props.todoListID)
    }

    const tasksListItems = props.tasks.length
        ? props.tasks.map(t => {
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            }
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitleStatus(t.id, title, props.todoListID)
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
                    <IconButton onClick={()=>removeTask(t.id)}
                                size={'small'}
                                color={'secondary'}>
                        <HighlightOffIcon/>
                    </IconButton>
                </ListItem>
            )
        })
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
    );
};

