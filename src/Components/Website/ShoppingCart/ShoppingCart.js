import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import './ShoppingCart.css';
import {Link} from "react-router-dom";
import GiftCardForm from "../Forms/GiftCardForm/GiftCardForm";
import Feedback from "../UI/Feedback/Feedback";
import {AuthContext} from "../../../context/AuthContext";

const ShoppingCart = ({shoppingCartItems, shoppingCartActive, setShoppingCartItems, setShoppingCartActive}) => {

    let [updatedShoppingCartItems, setUpdatedShoppingCartItems] = useState({
        data: ''
    });
    const [giftCardInfo, setGiftCardInfo] = useState("");
    const [order, setOrder] = useState({
        totalPriceItems: null,
        discount: null,
        vat: null,
        shippingCosts: null,
        productId: null,
        amount: null
    });
    const [activeGiftCard, setActiveGiftCard] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState('init');
    const [loading, toggleLoading] = useState(false);
    const { username } = useContext(AuthContext);

    let step = 1;
    if(username !== undefined)
        step = 2;

     const removeItem = () => {
         setShoppingCartItems({
             product: {
                 id: null,
                 amount: null
             }
         })

         setUpdatedShoppingCartItems({
                data: ""
            }
         )
    }


    function calculateSubTotal (amount) {
        let shippingCosts;
        let discount = 0;

        let price = updatedShoppingCartItems.data.price;
        let totalPriceItems = amount * price;
        const calculateVat = totalPriceItems * 0.21;

        if(totalPriceItems < 24.95) {
            shippingCosts = 4.95;
        } else {
            shippingCosts = 0;
        }

        let giftCardItem = JSON.parse(localStorage.getItem("giftcard"));
        if(giftCardItem !== "" && !setActiveGiftCard) {
            setActiveGiftCard(true);
            discount = giftCardItem.amount;
        }

        const total = shippingCosts + totalPriceItems - discount;

        if((updatedShoppingCartItems.data.id !== undefined && mode==='init') || (mode==='data' && totalPriceItems !== order.totalPriceItems)) {
            setMode('data');
            setOrder({
                totalPriceItems: totalPriceItems,
                subTotal: total,
                discount: discount,
                vat: calculateVat,
                shippingCosts: shippingCosts,
                productId: updatedShoppingCartItems.data.id,
                amount: amount
            });
        }

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

    function decreaseAmount(amount, id) {
        if(amount > 1) {
            amount = parseInt(amount) - 1;
            setShoppingCartItems({
                product: {
                    id: id,
                    amount: amount
                }
            })
        }
    }

    function increaseAmount(amount, id, stock) {

         console.log("amount "+amount+ " stock:"+ stock)
        if(amount < 100 && amount < stock) {
            amount = parseInt(amount) + 1;
            setShoppingCartItems({
                product: {
                    id: id,
                    amount: amount
                }
            })
        }
    }

    function ShoppingCartItems () {

        useEffect(() => {
            if (shoppingCartItems !== "") {
                Object.entries(shoppingCartItems.product).forEach(([key, value], i) => {
                    async function getCurrentProductInfo() {
                        toggleLoading(true);
                        const id = value;
                        let url = `/api/v1/product/${id}`;

                        console.log(url);

                        if(id !== undefined && key==="id") {
                            try {
                                const result = await axios.get(url);

                                setUpdatedShoppingCartItems({
                                    ...setUpdatedShoppingCartItems,
                                    data: result.data
                                });
                                setShoppingCartActive(true);
                                console.log(updatedShoppingCartItems);
                                toggleLoading(false);
                                localStorage.setItem("shopping_carts", JSON.stringify(shoppingCartItems));

                            } catch (e) {
                                console.error(e);
                                setError("Fout bij ophalen gegevens.");
                            }
                        }
                    }
                    getCurrentProductInfo();
                })
            }
        }, [])
    }

    const getShoppingCartTable = (amount) => {

        const newArrayItems = Array.from(Object.entries(updatedShoppingCartItems));

        console.log("Shoppingcart table met updated cart items");
        console.log(newArrayItems);
            return (
                newArrayItems.map((cartItem, key) => {
                    const itemValue = Object.values(shoppingCartItems);

                    let image = "";
                    let discountMessage = "";
                    if (cartItem[1].type !== 4)
                        image =
                            <div className="image"><img src={`/product_images/product_${cartItem[1].id}.png`} alt=''/>
                            </div>;
                    else
                        image = <div className="image"><img src={`/product_images/giftcard.png`} alt=''/></div>;
                    let finalPrice = cartItem[1].price;
                    if (cartItem[1].discount > 0) {
                        discountMessage = ` ${cartItem[1].discount}% korting`;
                        finalPrice = parseFloat(cartItem[1].price - (cartItem[1].price * (cartItem[1].discount / 100))).toFixed(2);
                    }

                    return (
                        <React.Fragment key={key}>
                            <div className="productItemContainer">
                                <div className="productImage">{image}</div>
                                <div className="productName"><Link
                                    to={`/product/${cartItem[1].id}`}>{cartItem[1].name}</Link>
                                    {discountMessage &&
                                    <>
                                        <br/><small>{discountMessage}</small>
                                    </>
                                    }</div>
                                <div className="productAmountContainer">
                                    <div className="productAmount"
                                         onClick={(e) => decreaseAmount(itemValue[0].amount, cartItem.id)}> -
                                    </div>
                                    <input
                                        type="text"
                                        placeholder=""
                                        maxLength="2"
                                        value={amount}
                                        name={cartItem[1].name}
                                    />
                                    <div className="productAmount"
                                         onClick={(e) => increaseAmount(itemValue[0].amount, cartItem.id, cartItem[1].stock)}> +
                                    </div>
                                </div>
                                <div className="productPrice">€{finalPrice}</div>
                                <div
                                    className="productPriceTotal">€{(amount * finalPrice).toFixed(2)}</div>
                            </div>
                        </React.Fragment>
                    )
                })
            )
    }

    const amount = shoppingCartItems.product.amount;
    const price = shoppingCartItems.product.price;

    return (
        <>
            <div className="home">
                <h1>Winkelwagen</h1>
                {error && <Feedback type="error" content={error} />}

                {ShoppingCartItems()}


                {shoppingCartActive ?
                    <>
                        <div className="shoppingCartContainer">
                            <div className="shoppingCartTop">
                                <div className="articleTop">Artikel</div>
                                <div className="amountTop">Aantal</div>
                                <div className="priceTop">Prijs p/s</div>
                                <div className="priceTotalTop">Prijs totaal</div>
                            </div>
                            {getShoppingCartTable(amount)}
                        </div>

                        <div className="shoppingCartBottomContainer">
                            <GiftCardForm giftCardInfo={giftCardInfo} setGiftCardInfo={setGiftCardInfo} />

                            <div className="shoppingCartCheckoutContainer">
                                <h2>Totaal:</h2>{loading ? <LoadingIndicator /> : calculateSubTotal(amount, price)}
                            </div>
                        </div>

                        <Link
                            to={{
                                pathname: "/winkelwagen/checkout/stappen",
                                state: {
                                    step: step,
                                    orderItems: order,
                                    shoppingCartItems: updatedShoppingCartItems
                                }
                            }}
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