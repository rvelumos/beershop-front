import React, {useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../../../Website/UI/Feedback/Error/Error";
import './DetailsProduct.css';
import OrderBlock from "../OrderBlock";
import RecommendedProducts from "../../RecommendedProducts/RecommendedProducts";

function DetailsProduct() {
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [productItem, setProductItem] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function getProductByID() {
            setError(false);
            toggleLoading(true);

            const url = `/api/v1/product/${id}/`;

            try {
                const result = await axios.get(url);
                    if(result) {
                        const product = result.data;
                        setProductItem(product);
                        toggleLoading(false);
                    }
            }catch{
                console.error(error);
                setError("could not reach external source");
            }
        }
        getProductByID()
    // eslint-disable-next-line
    }, [])

    function getItemInfo() {

        let image = "";
        if(productItem.type!==4) {
            image = <img src={`/product_images/product_${productItem.id}.png`} alt=''/>;
        } else {
            image = <img src={`/product_images/giftcard.png`} alt=''/>;
        }

        return(
            <section>
                <div className="DetailsProduct">
                    <div className="imageContent">
                        {image}
                    </div>
                    <div className="rightContent">
                        <div className="rightUpperContent">
                            <div className="titleContainer">
                                <div className="title">
                                    <h3 className="productName">{productItem.name}</h3>
                                </div>
                                <div className="productTaste">
                                    {productItem.taste}
                                </div>
                            </div>
                            <OrderBlock productItem={productItem} section="details" />
                        </div>
                        <div className="rightBottomContent">
                            <p className="productDescription">{productItem.description}</p>
                        </div>
                    </div>
                </div>

                <h1>Anderen bekeken ook</h1>
                <div className="recommendedProducts">
                    <RecommendedProducts category={productItem.category.id} />
                </div>
            </section>
        )
    }

    return (
        <>
            {loading ? <LoadingIndicator /> :
            getItemInfo()
            }
            {error && <Error type="message_container" content={error} /> }
        </>
    )
}

export default DetailsProduct;
