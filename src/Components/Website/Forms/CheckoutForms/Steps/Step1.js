import React from 'react';
import Login from "../../../UserProfile/Login/Login";
import {Link} from "react-router-dom";

const Step1 = ({currentStep, shoppingCartItems}) => {

    if(currentStep !== 1) {
        return null
    }

    return (
        <>
            <div className="userChoiceContainer" >
                <div className="blockContentContainer" >
                    <Login />
                </div>

                <div className="blockContentContainer" >
                    <div className="formContainer">
                        <h2>Gast</h2>
                        <div className="LoginForm" >
                            <p>Je wilt geen account aanmaken? Klik dan hieronder om verder te gaan</p>
                            <Link
                                to={{
                                    pathname: "/winkelwagen/checkout/stappen",
                                    state: {
                                        step: 2,
                                        shoppingCartItems: shoppingCartItems
                                    }
                                }}
                                onClick={() => window.location.reload()}
                                className="button">Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Step1;