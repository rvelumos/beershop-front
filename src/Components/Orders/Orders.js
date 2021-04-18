import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import Order from "./Order/Order";
import Error from "../Website/UI/Feedback/Error/Error";
import axios from "axios";

const Orders = ({isAdmin, token}) => {

    const [error, setError] = useState(false);
    const [orderItems, setOrderItems] = useState("");
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        async function getOrders() {

            setError(false);
            toggleLoading(true);

            let url = `/api/v1`;

            if (isAdmin) {
                url = `${url}/admin/orders/`;
            } else {
                //fix!!!
                let user_id = 1;
                url = `${url}/orders/customer/${user_id}/`;
            }

            console.log(url);
                console.log("de JWT token is :" + token + " en de admin is " + isAdmin);
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
                setError("Fout bij ophalen gegevens.");
                toggleLoading(false);
            }
        }

        getOrders();
    // eslint-disable-next-line
    },[]);

    return (
        <>
            <div className="OrdersOverview">
                {loading ? <LoadingIndicator /> : <Order orderItems={orderItems} error={error} isAdmin={isAdmin} setError={setError} />}
                {error && <Error type="message_container" content={error} /> }
            </div>
        </>
    )
}

export default Orders;