import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import Order from "./Order/Order";
import axios from "axios";
import './Orders.css';
import Feedback from "../Website/UI/Feedback/Feedback";

const Orders = ({isAdmin, token}) => {

    const [error, setError] = useState("");
    const [orderItems, setOrderItems] = useState("");
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        async function getOrders() {
            toggleLoading(true);

            let url = `/api/v1`;

            if (isAdmin) {
                url = `${url}/admin/orders/`;
            } else {
                //fix!!!
                let userId = 1;
                url = `${url}/orders/customer/${userId}/`;
            }

            console.log(url);
                try {
                    const result = await axios.get(url, {
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                console.log(result.data);
                if (result.data.length > 0) {
                    setOrderItems(result.data);
                    console.log(orderItems);
                    toggleLoading(false);
                }
            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen order gegevens.");
                toggleLoading(false);
            }
        }

        getOrders();
    // eslint-disable-next-line
    },[]);

    return (
        <>
            <div className="overview">
                {loading ? <LoadingIndicator /> : <Order orderItems={orderItems} token={token} error={error} isAdmin={isAdmin} setError={setError} />}
                {error && <Feedback type="error" content={error} /> }
            </div>
        </>
    )
}

export default Orders;