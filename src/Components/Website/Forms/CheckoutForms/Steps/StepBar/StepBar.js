import React from 'react';

const StepBar = ({currentStep}) => {

    if(currentStep===4) {
        return null;
    }

    function getSteps() {

        let stepInfo = Array;
        stepInfo[1] = "Login";
        stepInfo[2] = "Adresgegevens";
        stepInfo[3] = "Overzicht";

        let stepCounter = "";
        let classStep = "";
        for(let i=1; i<4; i++) {
            if(i !== currentStep)
                continue;
            stepCounter = <div className={classStep}>Stap {i}/3: {stepInfo[i]}</div>
        }

        return(
            <div className="progressContainer">
                <div className="progressSteps">
                    {stepCounter}
                </div>
            </div>
        )
    }

    return(
        getSteps()
    )
}

export default StepBar;