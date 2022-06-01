import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeFilterAT = ReturnType<typeof changeFilterAC>

type ActionType = RemoveTodoListAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeFilterAT

const initialState: Array<TodoListType> = []

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD_TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => ({type: 'REMOVE_TODOLIST', id: id} as const)
export const addTodolistAC = (title: string) => ({type: 'ADD_TODOLIST', title: title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE_TODOLIST_TITLE', id: id, title: title} as const)
export const changeFilterAC = (id: string, filter: FilterValuesType) => (
    {type: 'CHANGE_TODOLIST_FILTER', id: id, filter: filter} as const)
