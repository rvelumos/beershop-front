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
                                    {!openCustomerModal ?
                                        <div onClick={(e) => updateCurrentModal(orderItem.id)} className="details">Details</div>
                                        : !skip && <Modal token={token} id={orderItem.customerId} title={`Klant ${orderItem.customerId}`}  section="customer" handler={updateCurrentModal} />
                                    }
                                </td>
                                <td className="orderPrice">€{orderItem.priceTotal}</td>
                                <td className="orderDate">{orderDate}</td>
                                <td className="orderSent">{orderSent}</td>
                                <td className="orderUser"><Link to={`/cms/shipment/${orderItem.shippingId}`}>Details</Link></td>
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
                        return (
                            <>
                                <tr>
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
                    <Link to="/cms/orders/create/" className="button">Order toevoegen</Link><br/><br/>
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