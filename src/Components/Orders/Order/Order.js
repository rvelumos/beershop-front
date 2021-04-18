import React from 'react';
import './Order.css';
import { v4 as uuidv4 } from 'uuid';

function Order(props) {
    const OrderItems = (props) => {
        let {orderItems, setError, isAdmin} = props;

            //orderItems = Array.from(orderItems);

            if(orderItems.length > 0) {
                orderItems = Array.from(orderItems);
                return (
                    orderItems.map((orderItem) => {
                    if (isAdmin) {
                        let order_date = orderItem.order_date;
                        let order_sent = orderItem.order_sent;
                        order_date = order_date.split('T')[0];
                        order_sent = order_sent.split('T')[0];

                        return (
                            <div key={orderItem.id} className="Order">
                                <p className="orderID">{orderItem.id}</p>
                                <p className="orderPrice">{orderItem.total_price}</p>
                                <p className="orderDate">{order_date}</p>
                                <p className="orderSent">{order_sent}</p>
                                <p className="orderStatus">{orderItem.order_status}</p>
                                <p className="orderPaidStatus">{orderItem.invoice_status}</p>
                            </div>
                         )
                    } else {
                        return (
                            <>
                                <div key={uuidv4()} className="Order">
                                    <p className="orderName">{orderItem.name}</p>
                                    <p className="productTotalPrice">{orderItem.total_price}</p>
                                    <p className="productCode">{orderItem.code}</p>
                                </div>
                            </>
                        )
                    }
                }
                ))
            }
    }
    return(
        <>
            {OrderItems(props)}
        </>
    )
}

export default Order;