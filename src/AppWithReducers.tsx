import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './reducers/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './reducers/tasks-reducer';

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
    [todoListID: string]: Array<TaskType>
}

function AppWithReducers() {
    // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},// true -> false
            {id: v1(), title: 'JS/TS', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Cheeps', isDone: false},
            {id: v1(), title: 'Toilet paper', isDone: false},
        ]
    })
    //tasks
    const removeTask = (taskID: string, todoListID: string) => {
        dispatchTasks(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchTasks(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatchTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaskTitleStatus = (taskID: string, title: string, todoListID: string) => {
        dispatchTasks(changeTaskTitleAC(taskID, title, todoListID))
    }
    //todolist
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchTodoLists(changeFilterAC(todoListID, filter))
    }
    const changeTodolistTitle = (todoListID: string, title: string) => {
        dispatchTodoLists(changeTodolistTitleAC(todoListID, title))
    }
    const removeTodoList = (todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    // UI:
    const todoListsFoRender = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id] // весь массив
        if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }
        return (
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       style={{padding: '10px'}}
                       square>
                    <TodoList
                        title={tl.title}
                        todoListID={tl.id}
                        filter={tl.filter}
                        tasks={tasksForTodoList}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitleStatus}
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
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
