import React, {ChangeEvent, useState} from 'react'
import {
    GetTasksResponseType,
    ResponseType,
    taskAPI,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    TodoListType
} from './todolistAPI'


export default {
    title: 'API'
}

export const GetTodolist = () => {
    const [state, setState] = useState<Array<TodoListType>>([])

    const onClickButtonHandle = () => {
        todolistAPI.getTodoLists()
            .then(resp => setState(resp.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <button onClick={onClickButtonHandle}>Get TodoLists</button>
        </div>
    </div>
}
export const CreateTodoList = () => {
    const [state, setState] = useState<ResponseType<{ item: TodoListType }> | null>(null)
    const [title, setTitle] = useState<string>('')

    const onClickButtonHandle = () => {
        todolistAPI.createTodoList(title)
            .then(resp => setState(resp.data))
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={title} placeholder={'Title'} onChange={onChangeTitleHandle}/>
            <button onClick={onClickButtonHandle}>Create</button>
        </div>
    </div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')

    const onClickButtonHandle = () => {
        todolistAPI.deleteTodoList(todoListId)
            .then(resp => setState(resp.data))
    }
    const onChangeTodoListIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoListId(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder={'TodoListId'} onChange={onChangeTodoListIdHandle}/>
            <button onClick={onClickButtonHandle}>Delete</button>
        </div>
    </div>
}
export const UpdateTodoList = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickButtonHandle = () => {
        todolistAPI.updateTodoList(todoListId, title)
            .then(resp => setState(resp.data))
    }
    const onChangeTodoListIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoListId(e.currentTarget.value)
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder={'TodoListId'} onChange={onChangeTodoListIdHandle}/>
            <input value={title} placeholder={'Title'} onChange={onChangeTitleHandle}/>
            <button onClick={onClickButtonHandle}>Update</button>
        </div>
    </div>
}

export const GetTask = () => {
    const [state, setState] = useState<GetTasksResponseType | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')


    const onClickButtonHandle = () => {
        taskAPI.getTasks(todoListId)
            .then(resp => setState(resp.data))
    }
    const onChangeTodoListIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoListId(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder={'TodoListId'} onChange={onChangeTodoListIdHandle}/>
            <button onClick={onClickButtonHandle}>Get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<ResponseType<{ item: TaskType }> | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickButtonHandle = () => {
        taskAPI.createTask(todoListId, title)
            .then(resp => setState(resp.data))
    }
    const onChangeTodoListIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoListId(e.currentTarget.value)
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder={'TodoListId'} onChange={onChangeTodoListIdHandle}/>
            <input value={title} placeholder={'Title'} onChange={onChangeTitleHandle}/>
            <button onClick={onClickButtonHandle}>Create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const onClickButtonHandle = () => {
        taskAPI.deleteTask(todoListId, taskId)
            .then(resp => setState(resp.data))
    }
    const onChangeTodoListIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoListId(e.currentTarget.value)
    }
    const onChangeTaskIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder={'TodoListId'} onChange={onChangeTodoListIdHandle}/>
            <input value={taskId} placeholder={'TaskId'} onChange={onChangeTaskIdHandle}/>
            <button onClick={onClickButtonHandle}>Create task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<ResponseType<{ item: TaskType }> | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickButtonHandle = () => {
        taskAPI.updateTask(todoListId, taskId, {
            title: title,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            description: '',
            completed: false,
            startDate: '',
            deadline: ''
        })
            .then(resp => setState(resp.data))
    }
    const onChangeTodoListIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoListId(e.currentTarget.value)
    }
    const onChangeTaskIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder={'TodoListId'} onChange={onChangeTodoListIdHandle}/>
            <input value={taskId} placeholder={'TaskId'} onChange={onChangeTaskIdHandle}/>
            <input value={title} placeholder={'Title'} onChange={onChangeTitleHandle}/>

            <button onClick={onClickButtonHandle}>Create task</button>
        </div>
    </div>
}