import React, {useEffect, useState} from 'react';
import axios from "axios";
import Error from "../UI/Feedback/Error/Error";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import './ShoppingCart.css';
import {Link} from "react-router-dom";

const ShoppingCart = ({shoppingCartItems, shoppingCartActive, setShoppingCartItems, setShoppingCartActive}) => {

    //const [shoppingCartTotal, setShoppingCartTotal] = useState("");
    let [updatedShoppingCartItems, setUpdatedShoppingCartItems] = useState({
        data: ''
    });

    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    useEffect(() =>{
        let shoppingCart = localStorage.getItem("shopping_carts");
        console.log('shoppingcartitems ');
        console.log(shoppingCart);

        // shoppingCart = JSON.parse(shoppingCart);
        if (shoppingCart !== "") {
            //setShoppingCartItems(shoppingCart)
            //setShoppingCartActive(true);
            //setShoppingCartItems(shoppingCart);
        }
    }, [setShoppingCartItems])


    // const addItem = (item) => {
    //
    //     let cartCopy = [...shoppingCartItems];
    //     let {ID} = item;
    //     let existingItem = cartCopy.find(cartItem => cartItem.ID === ID);
    //
    //     if (existingItem) {
    //         existingItem.quantity += item.quantity
    //     } else {
    //         cartCopy.push(item)
    //     }
    //
    //     setShoppingCartItems(cartCopy)
    //
    //     let stringCart = JSON.stringify(cartCopy);
    //     localStorage.setItem("cart", stringCart)
    // }
    //
    // const editItem = (itemID, amount) => {
    //
    //     let cartCopy = [...shoppingCartItems]
    //     let itemExists = cartCopy.find(item => item.ID === itemID);
    //
    //     if (!itemExists) return
    //     itemExists.quantity += amount;
    //
    //     if (itemExists.quantity <= 0) {
    //         cartCopy = cartCopy.filter(item => item.ID !== itemID)
    //     }
    //
    //     setShoppingCartItems(cartCopy);
    //
    //     let cartString = JSON.stringify(cartCopy);
    //     localStorage.setItem('shopping_cart', cartString);
    // }
    //
    // const removeItem = (itemID) => {
    //
    //     let cartCopy = [...shoppingCartItems]
    //     cartCopy = cartCopy.filter(item => item.ID !== itemID);
    //
    //     setShoppingCartItems(cartCopy);
    //
    //     let cartString = JSON.stringify(cartCopy)
    //     localStorage.setItem('shopping_cart', cartString)
    // }

    // function handleAmount(itemID, amount) {
    //
    //     let cartCopy = [...shoppingCartItems]
    //     let itemExists = cartCopy.find(item => item.ID === itemID);
    //
    //     if (!itemExists) return
    //     itemExists.quantity += amount;
    //
    //     if (itemExists.quantity <= 0) {
    //         cartCopy = cartCopy.filter(item => item.ID !== itemID)
    //     }
    //
    //     //setShoppingCartItems(cartCopy);
    //
    //     let cartString = JSON.stringify(cartCopy);
    //     localStorage.setItem('shopping_cart', cartString);
    // }

    function calculateTotal (price, amount) {
        //const price = amount
    }

    function calculateItemTotal(amount, price) {
        return(amount * price);
    }

    function decreaseAmount(id, name) {
        const value = Object.values(shoppingCartItems);

        console.log("aantal is "+value);
        if (shoppingCartItems.id !== 0) {
            setShoppingCartItems({
                ...shoppingCartItems,
                id: shoppingCartItems.id - 1
            });
        }
        console.log(shoppingCartItems);
    }

    function increaseAmount(name, id) {
        const value = Object.values(shoppingCartItems);

        console.log("aantal is " +value);

        if (shoppingCartItems.id <= 99) {
            setShoppingCartItems({
                ...shoppingCartItems,
                id: shoppingCartItems.id + 1
            });
        }
        console.log(shoppingCartItems);
    }

    function ShoppingCartOverview () {

        useEffect(() => {

        if (shoppingCartItems !== "") {

            console.log("bij useeffect");
            console.log(shoppingCartItems);
            Object.keys(shoppingCartItems).forEach((item, i) => {
                console.log('items2 : ' + item);


                async function getCurrentProductInfo() {
                    //toggleLoading(true);
                    const id = item;
                    let url = `http://localhost:8080/api/v1/product/${id}`;

                    console.log(url);

                    try {
                        const result = await axios.get(url);

                        //let cartcopy = [...shoppingCartItems] ;
                        //cartcopy.push(result.data);
                        setUpdatedShoppingCartItems({
                            ...setUpdatedShoppingCartItems,
                            data: result.data
                        });
                        setShoppingCartActive(true);
                        console.log('spread');
                        console.log(updatedShoppingCartItems);
                        localStorage.setItem("shopping_carts", JSON.stringify(shoppingCartItems));

                    } catch (e) {
                        console.error(e);
                        setError("Fout bij ophalen gegevens.");
                    }
                    toggleLoading(false);
                }

                getCurrentProductInfo();

            })
        }
        }, [])
    }

    const getShoppingCartTable = () => {

        console.log(updatedShoppingCartItems);
        const newArrayItems = Array.from(Object.entries(updatedShoppingCartItems));

            return(
                newArrayItems.map((cartItem) => {
                    const itemValue = Object.values(shoppingCartItems);

                    let image="";
                    if(cartItem[1].type!==4) {
                        image = <div className="image"><img src={`/product_images/product_${cartItem[1].id}.png`} alt=''/></div>;
                    } else {
                        image = <div className="image"><img src={`/product_images/giftcard.png`} alt=''/></div>;
                    }
                    return (
                        <>
                            <div className="productItemContainer">
                                <div className="productImage">{image}</div>
                                <div className="productName">{cartItem[1].name}</div>
                                <div className="productAmountContainer">
                                    <div className="productAmount" onClick={(e) => decreaseAmount(cartItem[1].id, cartItem.name)}> - </div>
                                        <input
                                            type="text"
                                            placeholder=""
                                            maxLength="2"
                                            value={itemValue[0].amount}
                                            name={cartItem[1].name}
                                        />
                                    <div className="productAmount" onClick={(e) => increaseAmount(cartItem[1].id, cartItem.name)}> + </div>
                                </div>
                                <div className="productPrice">€{cartItem[1].price}</div>
                                <div className="productPriceTotal">€{calculateItemTotal(itemValue[0].amount, cartItem[1].price)}</div>
                            </div>
                        </>
                    )
                })

            )
    }

    return (
        <>
            <div className="home">
                <h1>Winkelwagen</h1>
                {error && <Error type="message_container" content={error} />}
                {/*{loading ? <LoadingIndicator /> : <Product product_items={updatedShoppingCartItems} />}*/}
                {loading ? <LoadingIndicator /> :
                    ShoppingCartOverview(updatedShoppingCartItems)
                }

                {shoppingCartActive ?
                    <>
                        <div className="shoppingCartContainer">
                            {getShoppingCartTable(updatedShoppingCartItems)}
                        </div>
                        <div className="shoppingCartCheckoutContainer">
                            {calculateTotal(updatedShoppingCartItems)}
                        </div>
                        <Link
                            to={{pathname: "/winkelwagen/checkout/stappen", state: {step: 1}}}
                            className="button"
                        >Checkout</Link>
                    </>
                : <p>Er zijn geen items aan je winkelwagen toegevoegd.</p>
                }
            </div>
        </>
    )
}

export default ShoppingCart;