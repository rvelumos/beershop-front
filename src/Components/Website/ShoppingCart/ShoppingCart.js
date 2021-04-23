import React, {useEffect, useState} from 'react';
//import Button from "../UI/Button/Button";
import axios from "axios";
import Error from "../UI/Feedback/Error/Error";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";

const ShoppingCart = ({shoppingCartItems, shoppingCartActive, setShoppingCartItems, setShoppingCartActive}) => {

  //  const [shoppingCartTotal, setShoppingCartTotal] = useState("");
    const [updatedShoppingCartItems, setUpdatedShoppingCartItems] = useState({
        data: ''
    });

    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(true);

    useEffect(() =>{
        let shoppingCart = localStorage.getItem("shopping_carts");
        console.log('shoppingcartitems ');
        console.log(shoppingCart);

        // shoppingCart = JSON.parse(shoppingCart);
        if (shoppingCart !== "") {
            setShoppingCartItems(shoppingCart)
            //setShoppingCartActive(true);
            setShoppingCartItems(shoppingCart);
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

    function ShoppingCartOverview () {

        useEffect(() => {

        if (shoppingCartItems !== "") {
            console.log("bij useeffect");
            console.log(shoppingCartItems);
            Object.keys(shoppingCartItems).forEach((item, i) => {
                console.log('items2 : ' + item);


                async function getCurrentProductInfo() {
                    //toggleLoading(true);
                    const id = item.replace("beer_item_", "");
                    let url = `http://localhost:8080/api/v1/product/${id}`;

                    console.log(url);

                    try {
                        const result = await axios.get(url);

                        console.log("HIERO");

                        //let cartcopy = [...shoppingCartItems] ;
                        //cartcopy.push(result.data);
                        setUpdatedShoppingCartItems({
                            ...setUpdatedShoppingCartItems,
                            data: result.data
                        });
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

        return(
            <p>ssss</p>
        )
    }

    const getShoppingCartTable = () => {

            return(
                Object.entries(updatedShoppingCartItems).map((item) => {
                    return(
                        <p>Item!</p>
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
                    getShoppingCartTable()
                }
                {shoppingCartActive ? ShoppingCartOverview()
                : <p>Er zijn geen items aan je winkelwagen toegevoegd.</p>
                }
            </div>
        </>
    )
}

export default ShoppingCart;