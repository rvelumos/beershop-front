import React from 'react';
import './Order.css';
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";

function Order(props) {
    const {isAdmin} = props;

    const OrderItems = (props) => {
        let {orderItems} = props;

        if(orderItems.length > 0) {
            orderItems = Array.from(orderItems);
            return (
                orderItems.map((orderItem) => {

                    let orderDate = orderItem.orderDate;
                    let orderSent = orderItem.orderSent;
                    orderDate = orderDate.split('T')[0];
                    if(orderSent !== null)orderSent = orderSent.split('T')[0];

                    if (isAdmin) {

                        return (
                            <tr key={orderItem.id} className="Order">
                                <td className="orderID">#{orderItem.id}</td>
                                <td className="orderUser">
                                    <Link to={`users/edit/${orderItem.username}`}>Details</Link>
                                </td>
                                <td className="orderPrice">€{orderItem.priceTotal}</td>
                                <td className="orderDate">{orderDate}</td>
                                <td className="orderSent">{orderSent}</td>
                                <td className="orderShipping">
                                    {orderItem.shipping !== undefined ?
                                        <i>
                                            {orderItem.shipping.street}
                                            {orderItem.shipping.number}<br/>
                                            {orderItem.shipping.postalCode} {orderItem.shipping.city} <br/>
                                            {orderItem.shipping.country}
                                        </i>
                                        :
                                        <p className="errorMessage">Geen info bekend</p>
                                    }
                                </td>
                                <td className="orderStatus">{orderItem.orderStatus}</td>
                                <td className="orderPaidStatus">{orderItem.invoiceStatus}</td>
                                <td>
                                    <div className="edit">
                                        <Link to={`/cms/orders/edit/${orderItem.id}`}>&#9999;</Link>
                                    </div>
                                </td>
                            </tr>
                         )
                    } else {
                        let warningClass="item";
                        if(orderItem.invoiceStatus==="UNPAID")
                            warningClass="warning";
                        return (
                            <React.Fragment key={orderItem.id}>
                                <tr className={warningClass}>
                                    <td className="orderID">#{orderItem.id}</td>
                                    <td className="orderDate">{orderDate}</td>
                                    <td className="orderSent">{orderSent}</td>
                                    <td className="orderPrice">€{orderItem.priceTotal}</td>
                                    <td className="orderInvoice">{orderItem.invoiceStatus}</td>
                                    <td className="orderCode"><Link to={{pathname: `/mijn_account/orders/${orderItem.id}`, state: {orderItem: orderItem}}}>Details</Link></td>
                                </tr>
                            </React.Fragment>
                        )
                    }
                })
            )
        }
    }
    return(
        <>
            {isAdmin ?
                <div className="itemContainer">
                    <h1>Overzicht orders</h1>
                    <table className="tableDetails">
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td>Klant</td>
                            <td>Totaalprijs</td>
                            <td>Besteldatum</td>
                            <td>Verzenddatum</td>
                            <td>Verzendadres</td>
                            <td>Status</td>
                            <td>Factuur status</td>
                            <td>Acties</td>
                        </tr>
                        {OrderItems(props)}
                        </tbody>
                    </table>
                </div>
                :
                <table key={uuidv4()} className="tableOrder">
                    <tbody>
                    <tr><td>Order ID: </td>
                        <td>Besteld op: </td>
                        <td className="mobile">Verzonden op: </td>
                        <td>Totaalprijs: </td>
                        <td className="mobile">Factuurstatus: </td>
                        <td>&nbsp;</td>
                    </tr>
                    {OrderItems(props)}
                    </tbody>
                </table>
            }
        </>
    )
}

export default Order;