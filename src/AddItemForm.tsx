import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {IconButton, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError(false)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickAddItem()
    }
    return (
        <div>
            <TextField value={title}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressAddItem}
                       variant="outlined"
                       error={error}
                       
                       label={error ? 'Error' :'Enter text'}
                       helperText={error && 'Title is required!'}
                       size={'small'}
            />
            <IconButton color={'primary'}
                        onClick={onClickAddItem}>
                <AddCircleOutlineIcon/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;