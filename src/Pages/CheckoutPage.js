import React, {useState} from 'react';
import ShoppingCart from "../Components/Website/ShoppingCart/ShoppingCart";
import {useLocation} from "react-router";

const CheckoutPage = () => {
    const location = useLocation();

    const [shoppingCartItems, setShoppingCartItems] = useState('');
    const [shoppingCartActive, setShoppingCartActive] = useState(false);


    if (location.state !== null && shoppingCartItems === '') {
        console.log(location.state.data);
        setShoppingCartItems(location.state.data);
        setShoppingCartActive(true);

        let cartString = JSON.stringify(setShoppingCartItems)
        localStorage.setItem('shopping_cart', cartString)
    }


    return (
        <div className="ContactPage">
            <ShoppingCart
                shoppingCartItems={shoppingCartItems}
                setShoppingCartItems={setShoppingCartItems}
                shoppingCartActive={shoppingCartActive}
                setShoppingCartActive={setShoppingCartActive}
            />
        </div>

    )
}

export default CheckoutPage;