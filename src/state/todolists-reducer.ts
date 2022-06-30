import {Dispatch} from 'redux'
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppRootStateType} from './store'

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = SetTodolistsActionType | RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                ...action.todolist,
                filter: 'all',
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            res.data.resultCode === 0 &&
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const updateTodolistTitileTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const todolist = getState().todolists.find(t => {
            return t.id === todolistId
        })

        if (todolist) {
            todolistsAPI.updateTodolist(todolistId, title)
                .then((res) => {
                    res.data.resultCode === 0 &&
                    dispatch(changeTodolistTitleAC(todolistId, title))
                })
        }
    }
}


