import React, {useEffect, useState} from "react";
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import Product from "../Product/Product";
import Feedback from "../../Website/UI/Feedback/Feedback";

function RecommendedProducts(props) {
    const [error, setError] = useState('');
    const [recommendedItems, setRecommendedItems] = useState("");
    const [loading, toggleLoading] = useState(false);
    const {category} = props;

    useEffect(() => {
        async function getRecommendedProducts() {
            toggleLoading(true);

            let url = `/api/v1/products/recommended/${category}/`;
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
        {loading ? <LoadingIndicator /> : <Product productItems={recommendedItems} />}
        {error && <Feedback type="error" content={error} /> }
        </>
    )
}

export default RecommendedProducts;