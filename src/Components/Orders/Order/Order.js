import React, {useState} from 'react';
import './Order.css';
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";
import Modal from "../../../Modal/Modal";

function Order(props) {
    const {isAdmin} = props;

    const OrderItems = (props) => {
        let {orderItems, token} = props;

        const [openCustomerModal, setOpenCustomerModal] = useState(false);
        const [currentModal, setCurrentModal] = useState('');

        const updateCurrentModal = (id) => {

            if (currentModal === ''){
                setCurrentModal(id);
            } else {
                setCurrentModal('');
            }

            toggleCustomerModal();
        }
        const toggleCustomerModal = () => {
            setOpenCustomerModal(!openCustomerModal);
        }
            if(orderItems.length > 0) {
                orderItems = Array.from(orderItems);
                console.log(orderItems);
                return (
                    orderItems.map((orderItem) => {

                    let orderDate = orderItem.orderDate;
                    let orderSent = orderItem.orderSent;
                    orderDate = orderDate.split('T')[0];
                    if(orderSent !== null)orderSent = orderSent.split('T')[0];

                    if (isAdmin) {
                        let skip = true;
                        if(currentModal===orderItem.id) {
                             skip = false;
                        }

                        return (
                            <tr key={orderItem.id} className="Order">
                                <td className="orderID">#{orderItem.id}</td>
                                <td className="orderUser">
                                    {console.log(orderItem.shipping.address.customer.id)}
                                    {!openCustomerModal ?
                                        <div onClick={(e) => updateCurrentModal(orderItem.id, "customer")} className="details">Details</div>
                                        : !skip && <Modal token={token} item={orderItem.shipping.address.customer} title={`Klant #${orderItem.customerId}`}  section="customer" handler={updateCurrentModal} />
                                    }
                                </td>
                                <td className="orderPrice">€{orderItem.priceTotal}</td>
                                <td className="orderDate">{orderDate}</td>
                                <td className="orderSent">{orderSent}</td>
                                <td className="orderShipping">
                                    <i>
                                        {orderItem.shipping.address.street}
                                        {orderItem.shipping.address.number}<br/>
                                        {orderItem.shipping.address.postalCode} {orderItem.shipping.address.city} <br />
                                        {orderItem.shipping.address.country}
                                    </i>
                                </td>
                                <td className="orderStatus">{orderItem.orderStatus}</td>
                                <td className="orderPaidStatus">{orderItem.invoiceStatus}</td>
                                <td>
                                    <div className="edit">
                                        <Link to={`/cms/orders/edit/${orderItem.id}`}>&#9999;</Link>
                                    </div>
                                    {/*<div className="delete" onClick={HandleClick(orderItem.id)}>*/}
                                    {/*    &#10008;*/}
                                    {/*</div>*/}
                                </td>
                            </tr>
                         )
                    } else {
                        let warning_class="item";
                        if(orderItem.invoiceStatus==="UNPAID")
                            warning_class="warning";
                        return (
                            <>
                                <tr className={warning_class}>
                                    <td className="orderID">#{orderItem.id}</td>
                                    <td className="orderDate">{orderDate}</td>
                                    <td className="orderSent">{orderSent}</td>
                                    <td className="orderPrice">€{orderItem.priceTotal}</td>
                                    <td className="orderInvoice">{orderItem.invoiceStatus}</td>
                                    <td className="orderCode"><Link to={{pathname: `/mijn_account/orders/${orderItem.id}`, state: {orderItem: orderItem}}}>Details</Link></td>
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
            {isAdmin ?
                <div className="itemContainer">
                    <table className="tableDetails">
                        <tbody>
                        <tr>
                            <td>Order ID</td>
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
                        <td>Verzonden op: </td>
                        <td>Totaalprijs: </td>
                        <td>Factuurstatus: </td>
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