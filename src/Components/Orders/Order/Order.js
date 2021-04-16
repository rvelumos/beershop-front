import React from 'react';
import './Order.css';
import { v4 as uuidv4 } from 'uuid';

function Order() {

    const OrderItems = (props) => {
        let {orderItems, setError, isAdmin} = props;
console.log(orderItems);
        if(orderItems.length  > 0) {
            orderItems = Array.from(orderItems);

            orderItems.map((orderItem) => {
                if (isAdmin) {
                    return (
                            <tr key={uuidv4()} className="Order">
                                <p className="orderName">{orderItem.name}</p>
                                <p className="productTotalPrice">{orderItem.total_price}</p>
                                <p className="productCode">{orderItem.code}</p>
                                <p className="productDate">{orderItem.date}</p>
                                <p className="productOrderStatus">{orderItem.orderStatus}</p>
                                <p className="productPaidStatus">{orderItem.paidStatus}</p>
                            </tr>
                    )
                } else {
                    return (
                        <div key={uuidv4()} className="Order">
                            <p className="orderName">{orderItem.name}</p>
                            <p className="productTotalPrice">{orderItem.total_price}</p>
                            <p className="productCode">{orderItem.code}</p>
                        </div>
                    )
                }
            })

        } else {
            setError("Geen orders gevonden");
        }
    }
    return(
        <>
            {/*to do !*/}
            <OrderItems />
        </>
    )
}

export default Order;