import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';
import {TaskType} from '../TodoListWithRedux';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/TaskWithLocalState',
    component: Task,
    args: {
        task: {id: 'sdf', isDone: true, title: 'JS'},
        todoListID: 'sdfsd',
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle')
    }
} as ComponentMeta<typeof Task>;

const TaskWithLocalState = () => {
    const [task, setTask] = useState<TaskType>({id: 'sdf', title: 'JS', isDone: false})

    const changeTaskStatus = () => setTask({...task, isDone: !task.isDone})
    const changeTaskTitle = (taskid:string, title: string) => setTask({...task, title})

    return <Task task={task} todoListID={'sdf'} removeTask={action('removeTask')} changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={changeTaskTitle}/>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWithLocalState> = () => <TaskWithLocalState/>;

export const TaskWithLocalStateStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskWithLocalStateStories.args = {}
