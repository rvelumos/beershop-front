import React, {useState} from 'react';
import Step1 from './Steps/Step1';
import Step1b from './Steps/Step1b';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Confirmation from './Confirmation';
import {useLocation} from "react-router";
import './CheckoutSteps.css';

const CheckoutSteps = () => {
    const [step, setStep] = useState('');
    const [choice, setChoice] = useState('');
    const [data, setData] = useState('');
    const [mode, setMode] = useState('init');

    const handleChange = (e) => {
        const {name, value} = e.target
        setData({
            [name]: value
        })
    }

    const location = useLocation();

    if(location.state === undefined && step === "") {
        return(
            <p className="error">De pagina is verlopen, je dient een nieuwe bestelling te maken.</p>
            )
    } else {
        if(mode === 'init') {
            setStep(location.state.step);
            setMode('data');
        }
    }

    return(
        <>
            <div className="textContentContainer">
                <h1>Bestellen</h1>

                {/*<StepBar />*/}

                    <Step1
                        currentStep={step}
                        handleChange={handleChange}
                        setStep={setStep}
                        choice={choice}
                        setChoice={setChoice}
                    />

                    <Step1b
                        currentStep={step}
                        handleChange={handleChange}
                        setStep={setStep}
                        // username={username}
                        // password={password}
                    />

                    <Step2
                        currentStep={step}
                        handleChange={handleChange}
                        setStep={setStep}
                        // username={username}
                    />

                    <Step3
                        currentStep={step}
                        handleChange={handleChange}
                        setStep={setStep}
                        // payment={payment}
                    />

                    <Confirmation currentStep={step} />
            </div>
        </>
    )
}

export default CheckoutSteps;