import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | changeTaskTitleAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{id: v1(), title: action.title, isDone: false},
                    ...state[action.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ?
                    {...t, title: action.newTitle} : t)
            }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: 'REMOVE-TASK', taskId, todoListId} as const)
export const addTaskAC = (title: string, todoListId: string) => ({type: 'ADD-TASK', title, todoListId} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => (
    {type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId} as const)
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => (
    {type: 'CHANGE-TASK-TITLE', taskId, newTitle, todoListId} as const)
