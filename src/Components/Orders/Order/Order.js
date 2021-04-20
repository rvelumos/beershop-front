import React from 'react';
import './Order.css';
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";

function Order(props) {
    const OrderItems = (props) => {
        let {orderItems, setError, isAdmin} = props;

            if(orderItems.length > 0) {
                orderItems = Array.from(orderItems);
                return (
                    orderItems.map((orderItem) => {
                    if (isAdmin) {
                        let order_date = orderItem.order_date;
                        let order_sent = orderItem.order_sent;
                        order_date = order_date.split('T')[0];
                        if(order_sent !== null)order_sent = order_sent.split('T')[0];

                        return (
                            <tr key={orderItem.id} className="Order">
                                <td className="orderID">{orderItem.id}</td>
                                <td className="orderUser"><Link to={`/cms/users/${orderItem.customerId}`}>Details</Link></td>
                                <td className="orderPrice">€{orderItem.price_total}</td>
                                <td className="orderDate">{order_date}</td>
                                <td className="orderSent">{order_sent}</td>
                                <td className="orderUser"><Link to={`/cms/shipment/${orderItem.shipping_id}`}>Details</Link></td>
                                <td className="orderStatus">{orderItem.order_status}</td>
                                <td className="orderPaidStatus">{orderItem.invoice_status}</td>
                                <td>
                                    <div className="edit">
                                        <Link to={`/cms/order/edit/${orderItem.id}`}>&#9999;</Link>
                                    </div>
                                    {/*<div className="delete" onClick={HandleClick(orderItem.id)}>*/}
                                    {/*    &#10008;*/}
                                    {/*</div>*/}
                                </td>
                            </tr>
                         )
                    } else {
                        return (
                            <>
                                <tr key={uuidv4()} className="Order">
                                    <td className="orderName">{orderItem.name}</td>
                                    <td className="orderTotalPrice">{orderItem.total_price}</td>
                                    <td className="orderCode">{orderItem.code}</td>
                                </tr>
                            </>
                        )
                    }
                }
                ))
            }
    }
    return(
        <>
                <div className="itemContainer">
                    <Link to="/cms/orders/add/" className="button">Order toevoegen</Link><br /><br />
                    <table className="tableDetails">
                        <tr>
                            <td>&nbsp;</td>
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
                    </table>
                </div>
            }
        </>
    )
}

export default Order;