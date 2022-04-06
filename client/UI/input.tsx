import React from 'react';


export const Input = (props) => {
    let {id, className, label,  ...attrs} = props;

    let classNames;


    return (
        <div className='input-fieldset'>
            {label &&
            <label className='input-label' htmlFor={id}>{label}</label>}
            <input
                name={id}
                className={classNames}
                {...attrs}
            />
        </div>
    );
};
