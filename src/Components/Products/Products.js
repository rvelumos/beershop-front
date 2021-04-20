import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import Product from './Product/Product';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../Website/UI/Feedback/Error/Error";
import {useParams} from "react-router";
import * as qs from "querystring";

function Products(props) {

    const [error, setError] = useState("");
    const [productItems, setProductItems] = useState("");
    const [loading, toggleLoading] = useState(false);

    const { searchResult } = useParams();
    const { isAdmin } = props;
    const {categoryArray, tasteArray} = props;

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

            let param_config = "";

            if(categoryArray !== null) {
                param_config = {
                    params: {
                        category: categoryArray
                    },
                    paramsSerializer: function(params) {
                        const newParams = "category_id=" + params.category.map(param=>`${param}`).join(',')
                        return newParams
                    },
                }
            }

            console.log(url);
            try {
                const result = await axios.get(url, {
                    param_config
                })
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
    }, [searchResult, categoryArray, tasteArray]);

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