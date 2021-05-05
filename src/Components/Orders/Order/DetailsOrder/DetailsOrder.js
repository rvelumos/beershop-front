import React from 'react';
import './DetailsOrder.css';
import {useLocation} from "react-router";

function DetailsOrder(props) {

    const OrderItems = (props) => {

        const location = useLocation();
        const orderItem = location.state.orderItem;

        let orderDate = orderItem.orderDate;
        let orderSent = orderItem.orderSent;
        orderDate = orderDate.split('T')[0];
        if (orderSent !== null) orderSent = orderSent.split('T')[0];

        let shipmentCost = 4.95;
        if(orderItem.priceTotal > 24.95)
            shipmentCost = 0;

        const total = shipmentCost + orderItem.priceTotal;

        let paymentStatus = "Onbetaald";
        if(orderItem.invoiceStatus === "PAID")
            paymentStatus = "Betaald via overschrijving";

        if(orderItem !== "") {
                return (
                    <>
                        <div className="textContentContainer">
                            <div className="detailsOrder">
                                <div className="detailsOrderTop">
                                    <h2>Order #{orderItem.id}</h2>
                                    <div className="orderDate"> geplaatst op {orderDate}</div>
                                </div>

                                <div className="detailsOrderProducts">
                                ITEMS
                                </div>

                                <div className="detailsOrderBottom">
                                    <div className="detailsShippingInfo">
                                        <h4>Bezorgdadres</h4>
                                        <div className="shippingAddress">
                                            {orderItem.shipping.address.street}
                                            {orderItem.shipping.address.number}<br/>
                                            {orderItem.shipping.address.postalCode} {orderItem.shipping.address.city} <br />
                                            {orderItem.shipping.address.country}
                                        </div>
                                    </div>

                                    <div className="detailsCost">
                                        <h4>Kosten</h4>
                                        <div className="orderPrice">Totaal producten: €{orderItem.priceTotal}</div>
                                        <div className="orderShipment">Verzending: €{shipmentCost}</div>

                                        <div className="orderTotal">Totaal: €{total}</div>
                                        <div className="orderInvoice">Status: {paymentStatus}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
            )
        }
    }
    return(
        <>
            <div className="detailsOrder">
                {OrderItems(props)}
            </div>
        </>
    )
}

export default DetailsOrder;