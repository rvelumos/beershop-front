import React from 'react';

const Confirmation = (props) => {

    const {email, currentStep} = props;

    if(currentStep !== 4) {
        return null;
    }

    return(

        <div className="Confirmation" >
            <h1>Je bestelling is gelukt!</h1>
            <p>Er zal een bevestiging worden gestuurd naar: {email}. We wensen je alvast veel drinkgenot met jouw aankoop!</p>
        </div>
    )
}

export default Confirmation;