import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import './DetailsProduct.css';
import OrderBlock from "../OrderBlock";
import RecommendedProducts from "../../RecommendedProducts/RecommendedProducts";
import Feedback from "../../../Website/UI/Feedback/Feedback";
import BreadCrumbs from "../../../Website/Navigation/BreadCrumbs/BreadCrumbs";

function DetailsProduct() {
    const { id } = useParams();
    const [error, setError] = useState('');
    const [productItem, setProductItem] = useState(false);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        async function getProductByID() {
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
        if(!isNaN(id))
            getProductByID()
        else
            setError("Invalid URL given.")

    }, [id, error])

    function getItemInfo() {

        if(productItem !== null && productItem.type !== 3) {
            let image;
            if (productItem.type !== 4)
                image = <img src={`/product_images/product_${productItem.id}.png`} alt=''/>;
            else
                image = <img src={`/product_images/giftcard.png`} alt=''/>;

            let sublink;
            switch (productItem.type) {
                case 1:
                    sublink = 'alle-bieren';
                    break;
                case 2:
                    sublink = 'alle-pakketten';
                    break;
                case 4:
                    sublink = 'cadeaubonnen';
                    break;
                default:
                    sublink = 'alle-bieren';
            }
            console.log(sublink);

            return (

                <section>
                    <BreadCrumbs
                        sublink={sublink}
                        activeItem={productItem.name}
                    />

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
                                <OrderBlock productItem={productItem} section="details"/>
                            </div>
                            <div className="rightBottomContent">
                                <p className="productDescription">{productItem.description}</p>
                            </div>
                        </div>
                    </div>

                    <h1>Anderen bekeken ook</h1>
                    <div className="recommendedProducts">
                        {loading ? <LoadingIndicator/> :
                            <RecommendedProducts category={productItem.category.id}/>
                        }
                    </div>
                </section>
            )
        } else {
            return (
                <Feedback content="Product niet gevonden" type="error" />
            )
        }
    }

    return (
        <>
            {loading ? <LoadingIndicator /> :
            getItemInfo()
            }
            {error && <Feedback type="error" content={error} /> }
        </>
    )
}

export default DetailsProduct;
