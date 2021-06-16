import React, {useContext, useEffect, useState} from 'react';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import Order from "./Order/Order";
import axios from "axios";
import './Orders.css';
import Feedback from "../Website/UI/Feedback/Feedback";
import {AuthContext} from "../../context/AuthContext";

const Orders = ({isAdmin, token}) => {
    const [error, setError] = useState("");
    const [orderItems, setOrderItems] = useState("");
    const [loading, toggleLoading] = useState(true);

    const { username } = useContext(AuthContext);

    useEffect(() => {
        async function getOrders(username) {
            toggleLoading(true);

            let url = `/api/v1`;

            if (isAdmin)
                url = `${url}/admin/orders/`;
            else
                url = `${url}/orders/customer/${username}/`;

            try {
                    const result = await axios.get(url, {
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                    if (result.data.length > 0) {
                        result.data.sort((a,b) => b.id-a.id);
                        setOrderItems(result.data);
                    }
            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen ordergegevens.");
            }
            toggleLoading(false);
        }

        if(username!==undefined)
            getOrders(username);
    // eslint-disable-next-line
    },[username]);

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