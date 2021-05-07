import React from 'react';

const StepBar = ({currentStep}) => {
    function getSteps() {

        let stepInfo = Array;
        stepInfo[1] = "Login";
        stepInfo[2] = "Adresgegevens";
        stepInfo[3] = "Overzicht";

        let stepCounter = "";
        let classStep = "";
        for(let i=1; i<5; i++) {
            if(i !== currentStep)
                continue;
            stepCounter = <div className={classStep}>Stap {i}/3: {stepInfo[i]}</div>
        }

        console.log(stepCounter);

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