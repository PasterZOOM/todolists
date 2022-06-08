import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    setNewTitle: (newTitle: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        if (title.trim()) {
            setEditMode(false)
            props.setNewTitle(title)
        }
    }
    const onKeyPressEditMode = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEditMode()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ?
            <TextField value={title}
                       onBlur={offEditMode}
                       onChange={onChangeSetTitle}
                       onKeyUp={onKeyPressEditMode}
                       autoFocus
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
})

export default EditableSpan;