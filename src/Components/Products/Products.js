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
    const { isAdmin, token } = props;
    const {categoryArray} = props;

    useEffect(() => {
        async function getProducts() {
            const {type, get} = props;

            setError(false);
            toggleLoading(true);

            let base_url = `http://localhost:8080/api/v1/products/`;
            let url = "";

            if(isAdmin)
                url = `${base_url}all/`;

            if (type > 0) {
                url = `${base_url}type/${type}/`;
            }

            if (searchResult !== undefined) {
                const cleanResult = searchResult.replace(/[^\w\s]/gi, "");
                url = `${base_url}search/${cleanResult}/`;
            }

            if (get === "latest") {
                url = `${url}latest/`;
            }

           // let param_config = "";

            if(categoryArray !== undefined && categoryArray.length > 0) {
                console.log("params: ");
                console.log(categoryArray);

                url = url + "?category_id=" + categoryArray;
            }

            console.log(url);
            try {
                const result = await axios.get(url)
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
    }, [searchResult, categoryArray]);

    return (
        <>
            <div className={isAdmin ? "overview" : "ProductOverview"} >
                {loading ? <LoadingIndicator /> : <Product productItems={productItems} token={token} isAdmin={isAdmin} />}
                {error && <Error type="message_container" content={error} /> }
            </div>
        </>
    )
}

export default Products;