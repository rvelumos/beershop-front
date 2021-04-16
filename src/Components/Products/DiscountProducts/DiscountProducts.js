import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../../Website/UI/Feedback/Error/Error";
import './DiscountProducts.css';

function DiscountProducts() {

    const [error, setError] = useState(false);
    const [productItems, setProductItems] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function getDiscountProducts() {

            setError(false);
            toggleLoading(true);

            let url = `http://localhost:8080/api/v1/products/discount/`;

            // if (searchResult !== undefined) {
            //     const cleanResult = searchResult.replace(/[^\w\s]/gi, "");
            //     url = `${url}search/${cleanResult}/`;
            // }

            //console.log(url);

            try {
                const result = await axios.get(url);
                if (result.data.length > 0){
                    setProductItems(result.data);
                } else {
                    setProductItems("");
                    setError("Geen resultaten");
                }
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                setError("Could not reach external datasource");
                toggleLoading(false);
            }
        }

        getDiscountProducts();

        // eslint-disable-next-line
    }, []);


    return (
        <>
            <div className="ProductOverview" >
                {loading ? <LoadingIndicator /> : <Product product_items={productItems} />}
                {error && <Error type="message_container" content={error} /> }
            </div>
        </>
    )
}

export default DiscountProducts;