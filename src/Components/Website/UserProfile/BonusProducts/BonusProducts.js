import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../../../Products/Product/Product';
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import Feedback from "../../UI/Feedback/Feedback";

function BonusProducts() {

    const [error, setError] = useState("");
    const [productItems, setProductItems] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        getBonusProducts();
    }, []);


    const getBonusProducts  = () => {
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
            {loading ? <LoadingIndicator /> : <Product productItems={productItems} />}
            {error && <Feedback type="error" content={error} /> }
        </>
    )
}

export default BonusProducts;