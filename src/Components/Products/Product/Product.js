import React from 'react';
import './Product.css';
import OrderBlock from "./OrderBlock";

function Product(props) {
    const displayProductItems = (props) => {
        const {product_items} = props;

        if(product_items.length  > 0) {
            return (
                product_items.map((product_item) => {
                    return (
                            <div className="Product">
                                <OrderBlock mode="main" productItem={product_item} section="overview" />
                            </div>
                    )
                })
            )
        }
    }
    return(
        <>
            {displayProductItems(props)}
        </>
    )
}

export default Product;