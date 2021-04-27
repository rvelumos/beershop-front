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

                    let order_date = orderItem.order_date;
                    let order_sent = orderItem.order_sent;
                    order_date = order_date.split('T')[0];
                    if(order_sent !== null)order_sent = order_sent.split('T')[0];

                    if (isAdmin) {
                        let skip = true;
                        if(currentModal===orderItem.id) {
                             skip = false;
                        }


                        return (
                            <tr key={orderItem.id} className="Order">
                                <td className="orderID">{orderItem.id}</td>
                                <td className="orderUser">
                                    {!openCustomerModal ?
                                        <div onClick={(e) => updateCurrentModal(orderItem.id)} className="details">Details</div>
                                        : !skip && <Modal token={token} id={orderItem.customerId} title={`Klant ${orderItem.customerId}`}  section="customer" handler={updateCurrentModal} />
                                    }
                                </td>
                                <td className="orderPrice">€{orderItem.price_total}</td>
                                <td className="orderDate">{order_date}</td>
                                <td className="orderSent">{order_sent}</td>
                                <td className="orderUser"><Link to={`/cms/shipment/${orderItem.shipping_id}`}>Details</Link></td>
                                <td className="orderStatus">{orderItem.order_status}</td>
                                <td className="orderPaidStatus">{orderItem.invoice_status}</td>
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
                                    <td className="orderDate">{order_date}</td>
                                    <td className="orderSent">{order_sent}</td>
                                    <td className="orderPrice">€{orderItem.price_total}</td>
                                    <td className="orderInvoice">{orderItem.invoice_status}</td>
                                    <td className="orderCode"><Link to={`/mijn_account/orders/details/${orderItem.id}`}>Details</Link></td>
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
                :
                <table key={uuidv4()} className="tableOrder">
                    <tr><td>Order ID: </td>
                        <td>Besteld op: </td>
                        <td>Verzonden op: </td>
                        <td>Totaalprijs: </td>
                        <td>Factuurstatus: </td>
                        <td>&nbsp;</td>
                    </tr>
                    {OrderItems(props)}
                </table>
            }
        </>
    )
}

export default Order;