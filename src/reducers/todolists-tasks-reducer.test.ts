import {TasksStateType, TodoListType } from '../AppWithRedux';
import {tasksReducer} from './tasks-reducer';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';

let startTasksState: TasksStateType
let startTodolistsState: Array<TodoListType>

beforeEach(() => {
    startTasksState = {}
    startTodolistsState = []
})

test('ids should be equals', () => {

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
});
