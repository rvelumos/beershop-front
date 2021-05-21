import Button from "../../Website/UI/Button/Button";
import {useHistory} from "react-router";
import React, {useState} from "react";
import {Link} from "react-router-dom";

const OrderBlock = ({productItem, isAdmin, section}) => {

    const [amountItem, setAmountItem] = useState({
        product: {
            id: '',
            amount: ''
        }
    });
    const [stockMessage, setStockMessage] = useState('');

    let history = useHistory();

    function AddToCart(e) {
        e.preventDefault();

        const value = e.target[0].value;
        if(value < 1 || isNaN(value)) {
            setStockMessage("Gelieve een correct aantal in te voeren");
        } else {
            if (value < productItem.stock) {
                history.push({
                    pathname: `/winkelwagen/`,
                    state: {data: amountItem}
                });
            } else {
                setStockMessage(` Let op: maximaal ${productItem.stock} op voorraad`)
            }
        }
    }

    function handleChange(evt, id) {
        const value = evt.currentTarget.value;

        setAmountItem({
            ...amountItem,
            product:{
                id: id,
                amount: value
            }
        });

        console.log(amountItem);
    }

    let finalPrice = parseFloat(productItem.price).toFixed(2);
    let discountContainer="";

    if(productItem.discount > 0) {
        finalPrice = productItem.price - ((productItem.price * productItem.discount) / 100) ;
        finalPrice = <><span className="disabledPrice"> {productItem.price.toFixed(2)}!</span> <i>Nu voor slechts: €{finalPrice.toFixed(2)}!</i></>;
        discountContainer=<div className="discountContainer"> -{productItem.discount}% </div>;
    }

    let stockInfo = "";
    let buttonDisabled = "";
    let readOnly = "";
    let tabIndex = "0";

    if (productItem.stock === 0) {
        stockInfo = <span className="outOfStock"> Uitverkocht</span>;
        buttonDisabled="DISABLED";
        readOnly="readonly";
        tabIndex="-1";
    } else if (productItem.stock < 25 && productItem.stock > 0) {
        stockInfo = <span className="stockAlmostEmpty"> Bijna uitverkocht!</span>;
    } else {
        stockInfo = <span className="stockFull"> Op voorraad!</span>;
    }

    if (isAdmin) {
        let url=`/cms` ;
        return (
            <div className="ProductContainer">
                <div className="productName"><a href={url}>{productItem.name}</a></div>
                <div className="productPrice">{productItem.price.toFixed(2)}</div>
                <div className="productDiscount">{productItem.discount}</div>
                <div className="productTaste">{productItem.taste}</div>
                <div className="productStock">{productItem.stock}</div>
            </div>
        )
    } else {
        const productName=productItem.id;

        let image="";
        let title="";
        if(section==='overview') {
            if(productItem.type!==4)
                image = <div className="image"><img src={productItem.image} alt=''/></div>;
             else
                image = <div className="image"><img src={`/product_images/giftcard.png`} alt=''/></div>;

            let url = `/product/${productItem.id}/`;
            title = <h3><Link to={url}>{productItem.name}</Link></h3>;
        }

        return (
            <>
            {discountContainer}
            {image}
                {title}
                <p className="productPrice">€{finalPrice} </p>
                <div className="orderProduct">
                    {stockMessage && <p className="errorMessage">&#9888;{stockMessage}</p>}
                    <form onSubmit={AddToCart} method="POST">
                        <input
                            type="text"
                            placeholder=""
                            maxLength="2"
                            name={productName}
                            onChange={evt => handleChange(evt, productItem.id)}
                            readOnly={readOnly}
                            tabIndex={tabIndex}
                        />
                        <Button value="Bestellen" usage="buttonCheckout" disabled={buttonDisabled} name="cart" type="cart"/><br/>
                        {stockInfo}
                    </form>
                </div>
            </>
        )
    }
}

export default OrderBlock;