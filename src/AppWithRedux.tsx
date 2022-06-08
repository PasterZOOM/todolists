import React, {useCallback} from 'react';
import './App.css';

import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodoListAC} from './reducers/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './reducers/store';
import {TaskType} from './TodoListWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer';
import {TodoList} from './TodoList';

// GUI
// CLI - command line interface
// C - create
// R - read
// U - update
// D - delete
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('AppWithRedux')
    // BLL:
    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    },[dispatch])
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    },[dispatch])
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    },[dispatch])
    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    },[dispatch])
    //todolist
    const changeFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(changeFilterAC(todoListID, filter))
    },[dispatch])
    const changeTodolistTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todoListID, title))
    },[dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    },[dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

    // UI:

    /*const todoListsWithReduxFoRender = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       style={{padding: '10px'}}
                       square>
                    <TodoListWithRedux
                        todoList={tl}
                    />
                </Paper>
            </Grid>

        )
    })*/
    const todoListsFoRender = todoLists.map(tl => {


        return (
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       style={{padding: '10px'}}
                       square>
                    <TodoList
                        title={tl.title}
                        todoListID={tl.id}
                        filter={tl.filter}
                        tasks={tasks[tl.id]}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>

        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container
                      spacing={5}>
                    {todoListsFoRender}
                    {/*{todoListsWithReduxFoRender}*/}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
