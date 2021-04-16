import React from 'react';

const StepBar = (props) => {

    function StepsHandler() {
        const {currentStep} = props;

        let steps = "";

        return (
            {steps}
        )
    }

    return (
        <>

            <div className="StepBarContainer" >
                {StepsHandler}
            </div>
        </>
    )
}

export default StepBar;