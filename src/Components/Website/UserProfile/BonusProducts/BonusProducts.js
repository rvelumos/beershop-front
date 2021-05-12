import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Product from '../../../Products/Product/Product';
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import Feedback from "../../UI/Feedback/Feedback";

function BonusProducts({customerPoints}) {

    const [error, setError] = useState("");
    const [productItems, setProductItems] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        getBonusProducts();
    }, []);

    async function getBonusProducts() {
        toggleLoading(true);

        let url = `/api/v1/products/type/3/`;

        try {
            const response = await axios.get(url);
            if (response) {
                const products = response.data;
                setProductItems(products);
                toggleLoading(false);
            }
        } catch(e) {
                console.error(e);
                setError("could not reach external source");
        }
    }

    return (
        <>
            {loading ? <LoadingIndicator /> : <Product productItems={productItems} customerPoints={customerPoints} />}
            {error && <Feedback type="error" content={error} /> }
        </>
    )
}

export default BonusProducts;