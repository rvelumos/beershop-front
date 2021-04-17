import React from 'react';
import './Gift.css';

import Button from "../../../Website/UI/Button/Button";


const addToCart = () => {
    return (
        'to implement'
    )
}

const handleAmountChange = (value, name) => {

    console.log("de waarde van "+name+" is " + value);

    return (
        "amount here"
    )
}

const Gift = (props) => {
    const {price, name, description} = props;

    const input_name = `gift_value_${price}`;

    return (
        <div className="Product">
            <h3 className="productName">{name}</h3>
            <p className="productDescription">{description}</p>
            <div className="orderProduct">
                <form onSubmit={addToCart}>
                    <input
                        type="text"
                        placeholder=""
                        name={input_name}
                        onChange={(e) => handleAmountChange(e.target.value, e.target.name)}
                    />
                </form>
                <Button value="Bestellen" usage="buttonCheckout" name="cart" type="cart"/>
            </div>
        </div>
    )
}

export default Gift;