import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type ActionType = RemoveTodoListAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeFilterAT

export type RemoveTodoListAT = {
    type: 'REMOVE_TODOLIST'
    payload: { id: string }
}
export type AddTodolistAT = {
    type: 'ADD_TODOLIST'
    payload: { title: string }
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {
        id: string,
        title: string
    }
}
export type ChangeFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER',
    payload: {
        id: string,
        filter: FilterValuesType
    }
}

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return todolists.filter(tl => tl.id !== action.payload.id)
        case 'ADD_TODOLIST':
            return [...todolists, {id: v1(), title: action.payload.title, filter: 'all'}]
        case 'CHANGE_TODOLIST_TITLE':
            return todolists.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return todolists.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => (
    {
        type: 'REMOVE_TODOLIST',
        payload: {
            id: id
        }
    })
export const AddTodolistAC = (title: string): AddTodolistAT => (
    {
        type: 'ADD_TODOLIST',
        payload: {title: title}
    })
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => (
    {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id: id,
            title: title
        }
    })
export const ChangeFilterAC = (id: string, filter: FilterValuesType): ChangeFilterAT => (
    {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            id: id,
            filter: filter
        }
    })
