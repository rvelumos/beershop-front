import React, {useState} from 'react';
import Step1 from './Steps/Step1';
import Step1b from './Steps/Step1b';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Confirmation from './Confirmation';
import {useLocation} from "react-router";
import './CheckoutSteps.css';
import StepBar from "./Steps/StepBar/StepBar";

const CheckoutSteps = () => {
    const [step, setStep] = useState('');
    const [choice, setChoice] = useState('');
    const [mode, setMode] = useState('init');
    const [orderItems, setOrderItems] = useState('');
    const [shipmentData, setShipmentData] = useState('');
    const [shoppingCartItems, setShoppingCartItems] = useState('');

    const location = useLocation();

    if(location.state === undefined && step === "") {
        return(
            <p className="error">De pagina is verlopen, je dient een nieuwe bestelling te maken.</p>
            )
    } else {
        if(mode === 'init') {
            setStep(location.state.step);
            setOrderItems(location.state.orderItems);
            setShipmentData(location.state.shipmentData);
            setShoppingCartItems(location.state.shoppingCartItems);
            setMode('data');
        }
    }

    return(
        <>
            <div className="checkoutContentContainer">
                <StepBar currentStep={step} />
                <h1>Bestellen</h1>

                    <Step1
                        currentStep={step}
                        setStep={setStep}
                        choice={choice}
                        setChoice={setChoice}
                        shoppingCartItems={shoppingCartItems}
                        orderItems={orderItems}
                        shipmentData={shipmentData}
                    />

                    <Step1b
                        currentStep={step}
                        setStep={setStep}
                        shoppingCartItems={shoppingCartItems}
                        orderItems={orderItems}
                        shipmentData={shipmentData}
                    />

                    <Step2
                        currentStep={step}
                        setStep={setStep}
                        shoppingCartItems={shoppingCartItems}
                        orderItems={orderItems}
                        shipmentData={shipmentData}
                    />

                    <Step3
                        currentStep={step}
                        setStep={setStep}
                        shoppingCartItems={shoppingCartItems}
                        orderItems={orderItems}
                        shipmentData={shipmentData}
                    />

                    <Confirmation
                        currentStep={step}
                        shoppingCartItems={shoppingCartItems}
                        orderItems={orderItems}
                        shipmentData={shipmentData}
                    />
            </div>
        </>
    )
}

export default CheckoutSteps;