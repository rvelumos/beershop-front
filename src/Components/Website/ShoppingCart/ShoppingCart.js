import React, {useEffect, useState} from 'react';
import axios from "axios";
import Error from "../UI/Feedback/Error/Error";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import './ShoppingCart.css';
import {Link} from "react-router-dom";
import GiftCardForm from "../Forms/GiftCardForm/GiftCardForm";

const ShoppingCart = ({shoppingCartItems, shoppingCartActive, setShoppingCartItems, setShoppingCartActive}) => {

    const [totalPriceItems, setTotalPriceItems] = useState(0);
    let [updatedShoppingCartItems, setUpdatedShoppingCartItems] = useState({
        data: ''
    });
    const [giftCardInfo, setGiftCardInfo] = useState("");
    const [activeGiftCard, setActiveGiftCard] = useState(false);

    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    // useEffect(() =>{
    //     let shoppingCart = localStorage.getItem("shopping_carts");
    //     console.log('shoppingcartitems ');
    //     shoppingCart = JSON.parse(shoppingCart);
    //     console.log(shoppingCart);
    //
    //     if (shoppingCart !== "") {
    //          const id = shoppingCartItems.id;
    //          const amount = shoppingCartItems.amount;
    //
    //         //setShoppingCartItems(shoppingCart)
    //         setShoppingCartItems(prevState => ({
    //             ...prevState,
    //             product: {
    //                 ...shoppingCartItems,
    //                 id: id,
    //                 amount: amount
    //             }
    //         }))
    //         //setShoppingCartActive(true);
    //     }
    // }, [setShoppingCartItems, shoppingCartItems])


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

    function calculateSubTotal () {
        let shippingCosts = 0;
        let discount = 0;

        const calculateVat = totalPriceItems * 0.21;

        if(totalPriceItems < 24.95) {
            shippingCosts = 4.95;
        }

        let giftCardItem = JSON.parse(localStorage.getItem("giftcard"));
        if(giftCardItem !== "" && !setActiveGiftCard) {
            setActiveGiftCard(true);
            discount = giftCardItem.amount;
            console.log("sads")
        }

        const total = shippingCosts + totalPriceItems - discount;

        return (
            <div className="summary">
                <p className="summaryTotal"><span>Totaal producten:</span><span>€{totalPriceItems.toFixed(2)}</span></p>
                {activeGiftCard && <p className="summaryGift"><span>Jouw korting:</span><span>-€{giftCardItem.amount}</span></p>}
                <p className="summaryVat"><span>BTW (21%):</span><span> €{calculateVat.toFixed(2)}</span></p>
                <p className="summaryShipping"><span>Verzending:</span><span> €{shippingCosts.toFixed(2)}</span></p>
                <p className="summarySubTotal"><span>Subtotaal:</span><span> €{total.toFixed(2)}</span></p>
            </div>
        )
    }

    function CalculateItemTotal(amount, price) {
        const itemTotal = amount * price;
        useEffect(() => {
            setTotalPriceItems(itemTotal);
        }, [itemTotal])
        return(itemTotal);
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

    function ShoppingCartItems () {

        useEffect(() => {

            if (shoppingCartItems !== "") {

                console.log(shoppingCartItems);
                Object.entries(shoppingCartItems.product).forEach(([key, value], i) => {
                    console.log('items2 : ' + key + value);

                    async function getCurrentProductInfo() {
                        if(key!=='id') return;
                        const id = value;
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
                newArrayItems.map((cartItem, key) => {
                    const itemValue = Object.values(shoppingCartItems);

                    let image="";
                    let discountMessage="";
                    if(cartItem[1].type!==4)
                        image = <div className="image"><img src={`/product_images/product_${cartItem[1].id}.png`} alt=''/></div>;
                    else
                        image = <div className="image"><img src={`/product_images/giftcard.png`} alt=''/></div>;
                    let finalPrice = cartItem[1].price;
                    if(cartItem[1].discount > 0) {
                        discountMessage = ` ${cartItem[1].discount}% korting`;
                        finalPrice = parseFloat(cartItem[1].price - (cartItem[1].price * (cartItem[1].discount / 100))).toFixed(2);
                    }

                    return (
                        <>
                            <div key={key} className="productItemContainer">
                                <div className="productImage">{image}</div>
                                <div className="productName"><Link to={`/product/${cartItem[1].id}`}>{cartItem[1].name}</Link>
                                { discountMessage &&
                                <>
                                    <br /><small>{discountMessage}</small>
                                </>
                                }</div>
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
                                <div className="productPrice">€{finalPrice}</div>
                                <div className="productPriceTotal">€{CalculateItemTotal(itemValue[0].amount, finalPrice)}</div>
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
                {loading ? <LoadingIndicator /> :
                    ShoppingCartItems()
                }

                {shoppingCartActive ?
                    <>
                        <div className="shoppingCartContainer">
                            <div className="shoppingCartTop">
                                <div className="articleTop">Artikel</div>
                                <div className="amountTop">Aantal</div>
                                <div className="priceTop">Prijs p/s</div>
                                <div className="priceTotalTop">Prijs totaal</div>
                            </div>
                            {getShoppingCartTable(updatedShoppingCartItems)}
                        </div>

                        <div className="shoppingCartBottomContainer">
                            <GiftCardForm giftCardInfo={giftCardInfo} setGiftCardInfo={setGiftCardInfo} />


                            <div className="shoppingCartCheckoutContainer">
                                <h2>Totaal:</h2> {calculateSubTotal(updatedShoppingCartItems)}
                            </div>
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