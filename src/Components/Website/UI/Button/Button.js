import React from 'react';
import './Button.css';

const Button = ({type, action, value, usage, disabled}) => {

    return (
        <button className={usage} value={type} disabled={disabled} onClick={action} >{value}</button>
    )
}

export default Button;