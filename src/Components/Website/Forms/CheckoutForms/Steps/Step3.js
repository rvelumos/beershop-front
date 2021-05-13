import React from 'react';
import {Link} from "react-router-dom";


const Step3 = ({currentStep, activeGiftCard, shipmentData, shoppingCartItems, orderItems}) => {

    if(currentStep !== 3) {
        return null;
    }

    function upperCaseFirst(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    console.log(shoppingCartItems);
    function currentOrderInfo() {

        if(shoppingCartItems !== "") {
            const cartItems = Array.from(Object.entries(shoppingCartItems));
            return (
                cartItems.map((shoppingCartItem) => {
                    console.log(cartItems);
                    return(
                        <div className='productOverview'>
                            <div>{shoppingCartItem[1].name}</div>
                            <div>{orderItems.amount}x</div>
                            <div>€{shoppingCartItem[1].price}</div>
                            <div>€{orderItems.totalPriceItems.toFixed(2)}</div>
                        </div>
                    )
                })
            )
        } else {
            return (
                <tr><td><p className="errorContainer">Er is iets fout gegaan bij het ophalen van jouw order, plaats je bestelling opnieuw.</p></td></tr>
            )
        }
    }

    return (
        <>
            <div className="overviewContainer">
                <h2>Overzicht van jouw bestelling</h2>
                <p>Controleer hieronder jouw bestelling. Klopt er iets niet? Klik op 'Terug' of bevestig de bestelling met 'Bevestigen'.</p>
                <div className="orderOverview">
                        <h3>Product</h3>
                        {currentOrderInfo()}
                        <div className="summary">
                            <p className="summaryTotal"><span>Totaal producten:</span><span>€{orderItems.totalPriceItems.toFixed(2)}</span></p>
                            {activeGiftCard && <p className="summaryGift"><span>Jouw korting:</span><span>-€{orderItems.amount}</span></p>}
                            <p className="summaryVat"><span>BTW (21%):</span><span> €{orderItems.vat.toFixed(2)}</span></p>
                            <p className="summaryShipping"><span>Verzending:</span><span> €{orderItems.shippingCosts.toFixed(2)}</span></p>
                            <p className="summarySubTotal"><span>Subtotaal:</span><span> €{orderItems.subTotal.toFixed(2)}</span></p>
                        </div>
                </div>

                <div className="addressOverview">
                    <h3>Verzendadres</h3>
                    <div className="shipmentOverview">
                        <p>{upperCaseFirst(shipmentData.firstname)} {upperCaseFirst(shipmentData.lastname)}</p>
                        <p>{shipmentData.street} {shipmentData.streetAdd} {shipmentData.number} </p>
                        <p>{shipmentData.postalCode.toUpperCase()} {shipmentData.city}</p>
                        <p>{shipmentData.province} {shipmentData.city}</p>
                        <p>{shipmentData.country}</p>
                    </div>
                </div>

                <p className="confirmEmail">Er zal een bevestigingsmail verzonden worden naar: {shipmentData.email}</p>

                <div className="buttonContainer">
                    <Link
                        to={{pathname: "/winkelwagen/checkout/stappen",
                            state: {
                                step: 1,
                                shipmentData: shipmentData,
                                orderItems: orderItems
                            }}}
                        onClick={() => window.location.reload()}
                        className="button">Terug
                    </Link>
                    <Link
                        to={{pathname: "/winkelwagen/checkout/stappen",
                            state: {
                                step: 4,
                                shipmentData: shipmentData,
                                orderItems: orderItems,
                                shoppingCartItems: shoppingCartItems
                            }
                        }}
                        onClick={() => window.location.reload()}
                        className="button">Bevestigen
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Step3;