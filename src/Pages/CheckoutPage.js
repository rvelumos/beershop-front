import React, {useState} from 'react';
import ShoppingCart from "../Components/Website/ShoppingCart/ShoppingCart";
import {useLocation} from "react-router";

const CheckoutPage = () => {
    const location = useLocation();

    const [shoppingCartItems, setShoppingCartItems] = useState('');
    const [shoppingCartActive, setShoppingCartActive] = useState(false);
    const [mode, setMode] = useState('init');

    let savedShoppingCart = localStorage.getItem("shopping_carts");
    console.log('shoppingcartitems ');
    console.log(savedShoppingCart);
    savedShoppingCart = JSON.parse(savedShoppingCart);
    console.log(savedShoppingCart);

    if (savedShoppingCart !== "" && mode === 'init') {
        const id = savedShoppingCart.id;
        const amount = savedShoppingCart.amount;

        //setShoppingCartItems(shoppingCart)
        setShoppingCartItems(prevState => ({
            ...prevState,
            product: {
                ...shoppingCartItems,
                id: id,
                amount: amount
            }
        }))
        setMode('data');
        //setShoppingCartActive(true);
    }

    if (location.state !== null && shoppingCartItems === '') {
        console.log(location.state.data);
        setShoppingCartItems(location.state.data);
        setShoppingCartActive(true);

        let cartString = JSON.stringify(shoppingCartItems);
        localStorage.setItem('shopping_carts', cartString)
    }



    return (
        <div className="shoppingCartPage">
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