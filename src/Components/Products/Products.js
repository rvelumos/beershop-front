import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import Product from './Product/Product';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../Website/UI/Feedback/Error/Error";
import {useParams} from "react-router";

function Products(props) {

    const [error, setError] = useState("");
    const [productItems, setProductItems] = useState("");
    const [loading, toggleLoading] = useState(false);

    const { searchResult } = useParams();
    const { isAdmin } = props;

    useEffect(() => {
        async function getProducts() {
            const {type, get} = props;

            setError(false);
            toggleLoading(true);

            let url = `http://localhost:8080/api/v1/products/`;

            if (type > 0) {
                url = `${url}type/${type}/`;
            }

            if (searchResult !== undefined) {
                const cleanResult = searchResult.replace(/[^\w\s]/gi, "");
                url = `${url}search/${cleanResult}/`;
            }

            if (get === "latest") {
                url = `${url}latest/`;
            }

            try {
                const result = await axios.get(url);
                if (result.data.length > 0){
                    setProductItems(result.data);
                } else {
                    setProductItems("");
                    setError("Geen resultaten");
                }
                //console.log(productItems);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
                toggleLoading(false);
            }
        }

        getProducts();

        // eslint-disable-next-line
    }, [searchResult]);

    return (
        <>
            <div className={isAdmin ? "ProductOverviewAdmin" : "ProductOverview"} >
                {loading ? <LoadingIndicator /> : <Product product_items={productItems} isAdmin={isAdmin} />}
                {error && <Error type="message_container" content={error} /> }
            </div>
        </>
    )
}

export default Products;