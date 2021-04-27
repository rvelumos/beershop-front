import Button from "../../Website/UI/Button/Button";
import {useHistory} from "react-router";
import React, {useState} from "react";

const OrderBlock = ({productItem, isAdmin, section}) => {

    const [amountItem, setAmountItem] = useState('');

    let history = useHistory();

    function AddToCart(e) {
        e.preventDefault();

        history.push({
            pathname: `/winkelwagen/`,
            state: { data: amountItem}
        });
    }

    function handleChange(evt, id) {
        const value = evt.currentTarget.value;

        setAmountItem({
            ...amountItem,
            [id]:{
                amount: value
            }
        });

        console.log(amountItem);
    }

    let final_price = productItem.price;
    let discount_container="";

    if(productItem.discount > 0) {
        final_price = productItem.price - ((productItem.price * productItem.discount) / 100) ;
        final_price = <><span className="disabledPrice"> {productItem.price}!</span> <i>Nu voor slechts: €{final_price.toFixed(2)}!</i></>;
        discount_container=<div className="discountContainer"> -{productItem.discount}% </div>;
    }

    let stock_info = "";
    let button_disabled = "";
    let read_only = "";
    let tab_index = "0";

    if (productItem.stock === 0) {
        stock_info = <span className="outOfStock"> Uitverkocht</span>;
        button_disabled="DISABLED";
        read_only="readonly";
        tab_index="-1";
    } else if (productItem.stock < 25 && productItem.stock > 0) {
        stock_info = <span className="stockAlmostEmpty"> Let op: bijna uitverkocht!</span>;
    } else {
        stock_info = <span className="stockFull"> Op voorraad!</span>;
    }

    if (isAdmin) {
        let url=`/cms` ;
        return (
            <div className="ProductContainer">
                <div className="productName"><a href={url}>{productItem.name}</a></div>
                <div className="productPrice">{productItem.price}</div>
                <div className="productDiscount">{productItem.discount}</div>
                <div className="productTaste">{productItem.taste}</div>
                <div className="productStock">{productItem.stock}</div>
            </div>
        )
    } else {
        // let current_value="";
        // for (const [key, value] of Object.entries(amountItem)) {
        //     if (key === productItem.name) current_value=value;
        //     console.log("het is "+ value);
        // }

        const productName=productItem.id;

        let image="";
        let title="";
        if(section==='overview') {
            if(productItem.type!==4) {
                image = <div className="image"><img src={`/product_images/product_${productItem.id}.png`} alt=''/></div>;
            } else {
                image = <div className="image"><img src={`/product_images/giftcard.png`} alt=''/></div>;
            }

            let url = `/product/${productItem.id}/`;
            title = <h3><a href={url}>{productItem.name}</a></h3>;
        }

        return (
            <>
            {discount_container}
            {image}
                {title}
                <p className="productPrice">€{final_price} </p>
                <div className="orderProduct">
                    <form onSubmit={AddToCart} method="POST">
                        <input
                            type="text"
                            placeholder=""
                            maxLength="2"
                            name={productName}
                            onChange={evt => handleChange(evt, productItem.id)}
                            readOnly={read_only}
                            tabIndex={tab_index}
                        />
                        <Button value="Bestellen" usage="buttonCheckout" disabled={button_disabled} name="cart" type="cart"/><br/>
                        {stock_info}
                    </form>
                </div>
            </>
        )
    }
}

export default OrderBlock;