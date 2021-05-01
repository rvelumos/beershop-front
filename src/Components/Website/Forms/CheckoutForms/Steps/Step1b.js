import React from 'react';
import RegistrationFormNew from '../../RegistrationForm/RegistrationFormNew';

const Step1b = ({currentStep}) => {

    if(currentStep !== 1.1) {
        return null;
    }

    return (
        <>
            <RegistrationFormNew />
        </>
    )
}

export default Step1b;