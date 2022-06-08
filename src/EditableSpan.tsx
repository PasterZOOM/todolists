import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    setNewTitle: (newTitle: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState(false)
    const onEditMode = useCallback(() => setEditMode(true),[])
    const offEditMode = useCallback(() => {
        if (title.trim()) {
            setEditMode(false)
            props.setNewTitle(title)
        }
    },[title, props])
    const onKeyPressEditMode = useCallback((e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEditMode(),[offEditMode])
    const onChangeSetTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value),[])

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