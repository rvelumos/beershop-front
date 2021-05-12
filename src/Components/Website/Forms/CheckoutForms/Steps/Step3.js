import React from 'react';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const Step3 = ({currentStep, shoppingCartItems, shipment, activeGiftCard}) => {

    const location = useLocation();

    if(currentStep !== 3) {
        return null;
    }
    //const userInfo = location.state.formData;
    const order = location.state.orderData;

    console.log(order);

    function currentOrderInfo() {
        if(shoppingCartItems !== "") {
            return (
                shoppingCartItems.map((shoppingCartItem) => {
                    return(
                        <tr>
                            <td>{shoppingCartItem.name}</td>
                            <td>{shoppingCartItem.amount}</td>
                            <td>{shoppingCartItem.price}</td>
                            <td>{order.id.totalPrice}</td>
                        </tr>
                    )
                })
            )
        } else {
            return (
                <tr><td><p className="errorContainer">Er is iets fout gegaan bij het ophalen van jouw order, plaats je bestelling opnieuw.</p></td></tr>
            )
        }
    }

    function currentShipmentInfo() {
        if(shoppingCartItems !== "") {
            return (
                <tr><td></td></tr>
            )
        } else {
            return (
                <tr><td><p className="errorContainer">Er is iets fout gegaan bij het ophalen van jouw adresgegevens, plaats je bestelling opnieuw.</p></td></tr>
            )
        }
    }

    return (
        <>
            <div className="overviewContainer">
                <h2>Overzicht van jouw bestelling</h2>
                <p>Controleer hieronder jouw bestelling. Klopt er iets niet? Klik op 'Terug' of bevestig de bestelling met 'Bevestigen'.</p>
                <div className="orderOverview">
                        <h2>Jouw bestelling</h2>
                        {currentOrderInfo}
                        <div className="summary">
                            <p className="summaryTotal"><span>Totaal producten:</span><span>€{order.totalPrice.toFixed(2)}</span></p>
                            {activeGiftCard && <p className="summaryGift"><span>Jouw korting:</span><span>-€{order.amount}</span></p>}
                            <p className="summaryVat"><span>BTW (21%):</span><span> €{order.vat.toFixed(2)}</span></p>
                            <p className="summaryShipping"><span>Verzending:</span><span> €{order.shippingCosts.toFixed(2)}</span></p>
                            <p className="summarySubTotal"><span>Subtotaal:</span><span> €{order.subTotal.toFixed(2)}</span></p>
                        </div>
                </div>

                <table className="addressOverview">
                    <tbody>
                        <h2>Jouw opgegeven adres</h2>
                        {currentShipmentInfo}
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