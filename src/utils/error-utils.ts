import {Dispatch} from 'redux'
import {ResponseType} from '../api/todolists-api'
import {AppReducerAT, RequestStatusType, setAppErrorAC, setAppStatusAC} from '../features/TodolistsList/app-reduser'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(setAppStatusAC(RequestStatusType.FAILED))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC(RequestStatusType.FAILED))
}

type ErrorUtilsDispatchType = Dispatch<AppReducerAT>