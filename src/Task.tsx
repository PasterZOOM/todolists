import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import EditableSpan from './EditableSpan';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {TaskType} from './TodoListWithRedux';

type TaskPropsType = {
    task: TaskType
    todoListID: string
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

export const Task: FC<TaskPropsType> = React.memo((props) => {

    const taskClasses = props.task.isDone ? 'is-done' : '';

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
    }, [props])
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListID)
    }, [props])

    return (
        <ListItem alignItems={'center'}
                  style={{padding: '0'}}
                  disableGutters
                  divider>
            <Checkbox
                color="primary"
                checked={props.task.isDone}
                onChange={changeTaskStatus}
                size={'small'}
            />
            <span className={taskClasses}>
                <EditableSpan title={props.task.title}
                              setNewTitle={changeTaskTitle}/>
            </span>
            <IconButton onClick={() => props.removeTask(props.task.id)}
                        size={'small'}
                        color={'secondary'}>
                <HighlightOffIcon/>
            </IconButton>
        </ListItem>
    )
})
