import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../../../Products/Product/Product';
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import Error from "../../UI/Feedback/Error/Error";

function BonusProducts() {

    const [error, setError] = useState(false);
    const [productItems, setProductItems] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        getBonusProducts();
    }, []);


    const getBonusProducts  = () => {
        setError(false);
        toggleLoading(true);

        let url = `http://localhost:8080/api/v1/products/type/3/`;

        axios.get(url)
            .then((response) => {
                const products = response.data;
                console.log(products);
                setProductItems(products);
                toggleLoading(false);
            })
            .catch((errorResponse) => {
                console.error(errorResponse);
                setError("could not reach external source");
            });
    }

    return (
        <>
            {loading ? <LoadingIndicator /> : <Product product_items={productItems} />}
            {error && <Error type="message_container" content={error} /> }
        </>
    )
}

export default BonusProducts;