import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import Product from './Product/Product';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import {useParams} from "react-router";
import Feedback from "../Website/UI/Feedback/Feedback";

function Products(props) {

    const [error, setError] = useState("");
    const [productItems, setProductItems] = useState("");
    const [loading, toggleLoading] = useState(false);

    const { searchResult } = useParams();
    const { isAdmin, token } = props;
    const {categoryArray} = props;

    async function insertKeyword(keyword) {
        const url = `/api/v1/search/${keyword}`;

        try {
            const result = await axios.post(url, {
                keyword: keyword
            })

            if (result.data.length > 0){
                setProductItems(result.data);
            } else {
                setProductItems("");
                setError("Geen resultaten");
            }
        } catch(e) {
            console.error(e);
            setError("Fout bij ophalen gegevens.");
        }
    }

    useEffect(() => {
        async function getProducts() {
            const {type, get} = props;

            toggleLoading(true);

            let baseUrl = `/api/v1/products/`;
            let url = "";

             if(isAdmin)
                 url = `${baseUrl}`;

            if (type > 0) {
                url = `${baseUrl}type/${type}/`;
            }

            if (searchResult !== undefined) {
                const cleanResult = searchResult.replace(/[^\w\s]/gi, "");
                insertKeyword(cleanResult);
                url = `${baseUrl}search/${cleanResult}/`;
            }

            if (get === "latest") {
                url = `${url}latest/`;
            }

            if(categoryArray !== undefined && categoryArray.length > 0) {
                url = url + "?category_id=" + categoryArray;
            }

            try {
                const result = await axios.get(url)

                if (result.data.length > 0){
                    setProductItems(result.data);
                } else {
                    setProductItems("");
                    setError("Geen resultaten");
                }
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
                {error && <Feedback type="error" content={error} /> }
            </div>
        </>
    )
}

export default Products;