import React from 'react';
import './Feedback.css';

const Feedback = (props) => {

    const {content, type} = props;

    return (
        <div className="feedbackContainer">
            <p className={type}>{content}</p>
        </div>
    )
}

export default Feedback;