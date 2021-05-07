import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import './DiscountProducts.css';
import Feedback from "../../Website/UI/Feedback/Feedback";

function DiscountProducts() {

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [productItems, setProductItems] = useState("");
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function getDiscountProducts() {
            toggleLoading(true);
            setError(true);

            const url = `/api/v1/products/discount/`;

            try {
                const result = await axios.get(url);
                if (result.data.length > 0){
                    setProductItems(result.data);
                    setError(false);
                } else {
                    setProductItems("");
                    setMessage("Geen resultaten");
                }
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                setMessage("Could not reach external datasource");
                toggleLoading(false);
            }
        }

        getDiscountProducts();

        // eslint-disable-next-line
    }, []);


    return (
        <>
            <div className="ProductOverview" >
                {loading ? <LoadingIndicator /> : <Product productItems={productItems} />}
                {error && <Feedback type="error" content={message} /> }
            </div>
        </>
    )
}

export default DiscountProducts;