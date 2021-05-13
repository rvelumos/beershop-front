import React from 'react';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';

const Step1b = ({currentStep}) => {

    if(currentStep !== 1.1) {
        return null;
    }

    return (
        <>
            <RegistrationForm />
        </>
    )
}

export default Step1b;