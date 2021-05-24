import React, {useState} from 'react';
import ShoppingCart from "../Components/Website/ShoppingCart/ShoppingCart";
import {useLocation} from "react-router";
import BreadCrumbs from "../Components/Website/Navigation/BreadCrumbs/BreadCrumbs";

const CheckoutPage = () => {
    const location = useLocation();

    const [shoppingCartItems, setShoppingCartItems] = useState('');
    const [shoppingCartActive, setShoppingCartActive] = useState(false);
    const [mode, setMode] = useState('init');

    let savedShoppingCart = localStorage.getItem("shopping_carts");
    savedShoppingCart = JSON.parse(savedShoppingCart);

    if (savedShoppingCart !== undefined && savedShoppingCart !== null && savedShoppingCart.product !== undefined && mode === 'init') {
        const id = savedShoppingCart.product.id;
        const amount = savedShoppingCart.product.amount;

        setShoppingCartItems(prevState => ({
            ...prevState,
            product: {
                ...shoppingCartItems,
                id: id,
                amount: amount
            }
        }))
        setMode('data');
    }

    if (location.state !== null && location.state !== undefined && location.state.deleted !== true  && shoppingCartItems === '') {
        setShoppingCartItems(location.state.data);

        let cartString = JSON.stringify(shoppingCartItems);
        localStorage.setItem('shopping_carts', cartString)
    }

    return (
        <>
            <div className="mainTop">
                <BreadCrumbs
                    activeItem="Winkelwagen"
                />
            </div>

            <div className="mainContent">
                <div className="shoppingCartPage">
                    <ShoppingCart
                        shoppingCartItems={shoppingCartItems}
                        setShoppingCartItems={setShoppingCartItems}
                        shoppingCartActive={shoppingCartActive}
                        setShoppingCartActive={setShoppingCartActive}
                    />
                </div>
            </div>
        </>
    )
}

export default CheckoutPage;