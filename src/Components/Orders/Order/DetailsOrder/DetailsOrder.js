import React from 'react';
import './DetailsOrder.css';
import {useLocation} from "react-router";
import Feedback from "react-bootstrap/Feedback";
import {Link} from "react-router-dom";

function DetailsOrder(props) {
    const OrderItems = () => {

        let orderItem;
        const location = useLocation();
        if(location.state !== undefined){
            orderItem = location.state.orderItem;
        }

        if (orderItem !== undefined) {
            let orderDate = orderItem.orderDate;
            let orderSent = orderItem.orderSent;
            orderDate = orderDate.split('T')[0];
            if (orderSent !== null) orderSent = orderSent.split('T')[0];

            let shipmentCost = 4.95;
            if (orderItem.priceTotal > 24.95)
                shipmentCost = 0;

            const total = shipmentCost + orderItem.priceTotal;

            let orderStatus = "In behandeling";
            let orderStatusClass;
            if (orderItem.orderStatus === "SENT" || orderItem.orderStatus === "RECEIVED")
                orderStatus = "Verzonden";
            else if (orderItem.orderStatus === "CANCELLED")
                orderStatusClass = "bad";

            let paymentStatus = "Onbetaald";
            let paymentStatusClass = "bad";
            if (orderItem.invoiceStatus === "PAID") {
                paymentStatusClass = "";
                paymentStatus = "Betaald via overschrijving";
            }

            if (orderItem !== "") {
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
                                        <h4>Bezorgadres</h4>
                                        <div className="shippingAddress">
                                            {/*{orderItem.shipping.address.street}*/}
                                            {/*{orderItem.shipping.address.number}<br/>*/}
                                            {/*{orderItem.shipping.address.postalCode} {orderItem.shipping.address.city}*/}
                                            {/*<br/>*/}
                                            {/*{orderItem.shipping.address.country}*/}
                                        </div>
                                    </div>

                                    <div className="detailsCost">
                                        <h4>Kosten</h4>
                                        <div className="orderPrice">Totaal producten: €{orderItem.priceTotal}</div>
                                        <div className="orderShipment">Verzending: €{shipmentCost}</div>

                                        <div className="orderTotal">Totaal: €{total}</div>
                                        <div className="orderInvoice"><b>Factuurstatus</b>: <span className={paymentStatusClass}>{paymentStatus}</span></div>
                                        <div className="orderStatus"><b>Verzendstatus</b>:  <span className={orderStatusClass}>{orderStatus}</span></div>
                                    </div>
                                </div>
                                <div className="downloadPDF"><Link to={`/mijn_account/orders/generate_pdf/${orderItem.id}`}><img src="/icons/pdf.png" alt="Download factuur"/>Download factuur</Link></div>
                            </div>
                        </div>
                    </>
                )
            }
        } else {
            return(
                <Feedback type="error" content="Order is niet gevonden" />
            )
        }
        }
        return (
            <>
                <div className="detailsOrderContainer">
                    {OrderItems(props)}
                </div>
            </>
        )
}

export default DetailsOrder;