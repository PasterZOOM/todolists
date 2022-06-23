import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from './todolistAPI'

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoLists()
            .then(resp => setState(resp.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'YOYOYOYOYOYO'
        todolistAPI.createTodolist(title)
            .then(resp => setState(resp.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '79be7923-947d-469f-87ef-82f06cb6c3a9'
        todolistAPI.deleteTodolist(todolistId)
            .then(resp => setState(resp.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2025cb30-9b00-4f3f-bf85-0aff843121ba'
        const title = 'NEW TITLE TODOLIST'
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dfa864f0-a20d-4d51-a4bb-3833b3af3f53'
        taskAPI.getTodolist(todolistId)
            .then(resp => setState(resp.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dfa864f0-a20d-4d51-a4bb-3833b3af3f53'
        const title = 'YOYOYOYOYOYO'
        taskAPI.createTask(todolistId, title)
            .then(resp => setState(resp.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dfa864f0-a20d-4d51-a4bb-3833b3af3f53'
        const taskId = '6dbcc812-150b-4d5d-abc1-37ab0008c6f9'
        taskAPI.deleteTask(todolistId, taskId)
            .then(resp => setState(resp.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dfa864f0-a20d-4d51-a4bb-3833b3af3f53'
        const taskId = '6dbcc812-150b-4d5d-abc1-37ab0008c6f9'
        const title = 'NEW TITLE FOR TASK'
        taskAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}