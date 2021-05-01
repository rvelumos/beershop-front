import React from 'react';
import {Link} from "react-router-dom";

const Step3 = ({currentStep}) => {

    if(currentStep !== 3) {
        return null;
    }

    return (
        <>
            <div className="overviewContainer">
                <h2>Overzicht van jouw bestelling</h2>
                <p>Controleer hieronder jouw bestelling. Klopt er iets niet? Klik op 'Terug' of bevestig de bestelling met 'Bevestigen'.</p>
                <table>
                <tbody>
                    <tr><td></td></tr>
                </tbody>
                </table>

                <Link
                    to={{pathname: "/winkelwagen/checkout/stappen", state: {step: 1}}}
                    onClick={() => window.location.reload()}
                    className="button">Terug
                </Link>
                <Link
                    to={{pathname: "/winkelwagen/checkout/stappen", state: {step: 4}}}
                    onClick={() => window.location.reload()}
                    className="button">Bevestigen
                </Link>
            </div>
        </>
    )
}

export default Step3;