import React, {useState} from 'react';
import './Product.css';
import OrderBlock from "./OrderBlock";
import {Link} from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";

function Product(props) {
    let {product_items, isAdmin} = props;

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(true);
    const [message, setMessage] = useState(true);

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

        if(product_items.length  > 0) {
            if(isAdmin) {
                product_items = product_items.filter(e => e.type !== 4);
            }
            return (

                product_items.map((product_item) => {
                    if(!isAdmin) {
                        return (
                            <div className="Product" key={product_item.id}>
                                <OrderBlock mode="main" productItem={product_item} section="overview"/>
                            </div>
                        )
                    } else {
                        return(
                            <tr key={product_item.id} className="Order">
                                <td className="productID">{product_item.id}</td>
                                <td className="productCategory">{product_item.categoryId}</td>
                                <td className="productManufacturer">{product_item.manufacturer_id}</td>
                                <td className="productName">{product_item.name}</td>
                                <td className="productPrice">€{product_item.price.toFixed(2)}</td>
                                <td className="productTaste">{product_item.taste}</td>
                                <td className="productStock">{product_item.stock}</td>
                                <td className="productDescription">{product_item.description}</td>
                                <td className="productType">{product_item.type}</td>
                                <td>
                                    <div className="edit">
                                        <Link to={`/cms/products/edit/${product_item.id}`}>&#9999;</Link>
                                    </div>
                                    <div className="delete" onClick={(e) => deleteProduct(product_item.id)}>
                                        &#10008;
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
            {message && <p> {message} </p>}
            {loading ? <LoadingIndicator/> :
                <>
                {isAdmin ?
                    <>
                    <div className="itemContainer">
                        {error && <p> {error} </p>}
                        <Link to="/cms/products/create/" className="button">Product toevoegen</Link><br /><br />
                        <table className="tableDetails">
                            <tr>
                                <td>&nbsp;</td>
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
                        </table></div>
                    </>
                    :
                    displayProductItems(props)
                }
            </>}

        </>
    )
}

export default Product;