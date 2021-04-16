import React from 'react';

const Error = (props) => {

    const {content} = props;

    return (
            <div className="errorContainer">
                <p className="Error">{content}</p>
            </div>
    )
}

export default Error;