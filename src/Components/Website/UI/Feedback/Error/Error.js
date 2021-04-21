import React from 'react';
import './Error.css';

const Error = (props) => {

    const {content} = props;

    return (
            <div className="errorContainer">
                <p className="Error">{content}</p>
            </div>
    )
}

export default Error;