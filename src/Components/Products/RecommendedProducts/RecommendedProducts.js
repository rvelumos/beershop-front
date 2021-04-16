import React, {useEffect, useState} from "react";
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../../Website/UI/Feedback/Error/Error";
import Product from "../Product/Product";

function RecommendedProducts(props) {
    const [error, setError] = useState(false);
    const [recommendedItems, setRecommendedItems] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const {category} = props;

    useEffect(() => {
        async function getRecommendedProducts() {
            setError(false);
            toggleLoading(true);

            let url = `http://localhost:8080/api/v1/recommended/${category}/`;

            try {
                const result = await axios.get(url);
                if (result.data.length > 0){
                    setRecommendedItems(result.data);
                } else {
                    setRecommendedItems("");
                    setError("Geen resultaten");
                }
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                setError("Could not reach external datasource");
                toggleLoading(false);
            }
        }

        getRecommendedProducts();

        // eslint-disable-next-line
    }, []);

    return(
        <>
        {loading ? <LoadingIndicator /> : <Product product_items={recommendedItems} />}
        {error && <Error type="message_container" content={error} /> }
        </>
    )
}

export default RecommendedProducts;