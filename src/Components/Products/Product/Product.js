import React, {useState} from 'react';
import './Product.css';
import OrderBlock from "./OrderBlock";
import {Link} from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";

function Product(props) {
    let {productItems, isAdmin} = props;

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const {token} = props;

    async function deleteProduct(id) {
        toggleLoading(true);
        let url = `/api/v1/admin/product/${id}`;

        try {
            const result = await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(result) {
                setMessage("Product is verwijderd... moment");
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwijderen product.");
            toggleLoading(false);
        }
    }

    const displayProductItems = () => {

        if(productItems.length  > 0) {
            if(isAdmin) {
                productItems = productItems.filter(e => e.type !== 4);
            }

            return (
                productItems.map((productItem) => {
                    if(!isAdmin) {
                        return (
                            <div className="Product" key={productItem.id}>
                                <OrderBlock mode="main" productItem={productItem} section="overview"/>
                            </div>
                        )
                    } else {
                        let classStock;
                        if (productItem.stock === 0) {
                            classStock = "outOfStockCell";
                        } else if (productItem.stock < 25 && productItem.stock > 0) {
                            classStock = "StockAlmostEmptyCell";
                        } else {
                            classStock = "stockFullCell";
                        }

                        let shortDescription = <i>Niet ingevuld</i>;
                        if(productItem.description !== null)shortDescription = productItem.description.substr(0,60) + "...";
                        return(
                            <tr key={productItem.id} className={`Order ${classStock}`}>
                                <td className="productID">{productItem.id}</td>
                                <td className="productCategory">({productItem.category.id}) {productItem.category.name}</td>
                                <td className="productManufacturer">{productItem.manufacturer.name}</td>
                                <td className="productName">{productItem.name}</td>
                                <td className="productPrice">€{productItem.price.toFixed(2)}</td>
                                <td className="productTaste">{productItem.taste}</td>
                                <td className="productStock"><span>{productItem.stock}</span></td>
                                <td className="productDescription">{shortDescription}</td>
                                <td className="productType">{productItem.type}</td>
                                <td>
                                    <div className="actionContainer">
                                        <div className="edit">
                                            <Link to={`/cms/products/edit/${productItem.id}`}>&#9999;</Link>
                                        </div>
                                        <div className="delete" onClick={(e) => deleteProduct(productItem.id)}>
                                            &#10008;
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                })
            )
        }
    }
    return(
        <>
            {loading ? <LoadingIndicator/> :
                <>
                {isAdmin ?
                    <>
                    {message && <p className="notice"> {message} </p>}
                    <div className="itemContainer">
                        <h1>Overzicht producten</h1>
                        {error && <p> {error} </p>}
                        <Link to="/cms/products/create/" className="button">Product toevoegen</Link><br /><br />
                        <table className="tableDetails">
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>Categorie</td>
                                    <td>Fabrikant</td>
                                    <td>Naam</td>
                                    <td>Prijs</td>
                                    <td>Smaak</td>
                                    <td>Voorraad</td>
                                    <td>Omschrijving</td>
                                    <td>Type</td>
                                    <td>Acties</td>
                                </tr>
                            { displayProductItems(props)}
                            </tbody>
                        </table></div>
                    </>
                    :
                    <>
                        {displayProductItems(props)}
                    </>
                }
            </>}

        </>
    )
}

export default Product;