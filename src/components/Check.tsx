import React, { ChangeEvent } from 'react';

type CheckPropsType={
    isDone:boolean
    callBack:(checkedValue:boolean)=>void
}

export const Check = (props:CheckPropsType) => {
    const onChangeHandleer = (event:ChangeEvent<HTMLInputElement>) =>{
        props.callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox"
               checked={props.isDone}
               onChange={onChangeHandleer}/>
    );
};

