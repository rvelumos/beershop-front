import React, {memo, useEffect,  useState} from 'react';
//import Button from "../UI/Button/Button";
import axios from "axios";

const ShoppingCart = ({shoppingCartItems, shoppingCartActive, setShoppingCartItems, setShoppingCartActive}) => {

  //  const [shoppingCartTotal, setShoppingCartTotal] = useState("");
    const [updatedShoppingCartItems, setUpdatedShoppingCartItems] = useState("");

    let shoppingCart = localStorage.getItem("shopping_carts");
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        console.log('hierooo');
        shoppingCart = JSON.parse(shoppingCart);
        if (shoppingCart) {
            setShoppingCartItems(shoppingCart)

            return (
                <div>

                </div>
            )
        }
    }, [])


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

    const shoppingCartOverview = memo(() => {

        if (shoppingCartItems) {
            Object.keys(shoppingCartItems).forEach((item, i) => {
                console.log('items2 : ' + item);

//                useEffect(() => {
                async function getCurrentProductInfo() {
                    const id = item.replace("beer_item_", "");
                    let url = `http://localhost:8080/api/v1/product/${id}`;

                    console.log(url);

                    try {
                        const result = await axios.get(url);
                        if (result.data.length > 0) {
                            setUpdatedShoppingCartItems(result.data);
                        } else {
                            setUpdatedShoppingCartItems("");
                            setError("Geen resultaten");
                        }
                        console.log(updatedShoppingCartItems);
                        toggleLoading(false);
                    } catch (e) {
                        console.error(e);
                        setError("Fout bij ophalen gegevens.");
                        toggleLoading(false);
                    }
                }

                getCurrentProductInfo();
                //               }, [])
            })
        }


        return(
            <p>ssss</p>
        )
    })

    return (
        <>
            <div className="home">
                <h1>Winkelwagen</h1>
                {loading ? loading : <p>Items</p>}
                {shoppingCartActive ? shoppingCartOverview
                : <p>Er zijn geen items aan je winkelwagen toegevoegd.</p>
                }
            </div>
        </>
    )
}

export default ShoppingCart;