import React, {useState} from 'react';
import './GiftCard.css';
import {Link} from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import Feedback from "react-bootstrap/Feedback";

function GiftCard(props) {

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function deleteGiftCard(id){
        const {token} = props;

        toggleLoading(true);
        const url = `/api/v1/admin/product/${id}`;

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
            setError("Fout bij verwijderen cadeaubon.");
            toggleLoading(false);
        }
    }

    const displayGiftCardItems = (props) => {
        let {giftCardItems} = props;

        if(giftCardItems.length  > 0) {
            giftCardItems = Array.from(giftCardItems);
            return (
                giftCardItems.map((giftCardItem) => {
                    return (
                            <tr key={giftCardItem.id} className="Order">
                                <td><p className="giftCardID">#{giftCardItem.id}</p></td>
                                <td><p className="giftCardName">{giftCardItem.name}</p></td>
                                <td><p className="giftCardPrice">€{giftCardItem.price}</p></td>
                                <td><p className="giftCardDescription">{giftCardItem.description}</p></td>
                                <td><p className="giftCardUsed"><Link to={`/cms/giftcard/${giftCardItem.id}`}>Bekijk overzicht</Link></p></td>
                                <td>
                                    <div className="actionContainer">
                                        <div className="edit"><Link to={`/cms/giftcards/edit/${giftCardItem.id}`}>&#9999;</Link>
                                        </div>
                                        <div className="delete" onClick={(e) => deleteGiftCard(giftCardItem.id)}>
                                            &#10008;
                                        </div>
                                    </div>
                                </td>
                            </tr>
                    )
                })
            )
        }
    }
    return(
        <>
            {loading ? <LoadingIndicator/> :
                <div className="itemContainer">
                    <h1>Overzicht producten</h1>
                    {message && <p className="notice"> {message} </p>}
                    {error && <Feedback type="error" content={error} />}
                    <Link to="/cms/giftcards/create/" className="button">Cadeaukaart toevoegen</Link><br/><br/>
                    <table className="tableDetails">
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td>Naam</td>
                            <td>Hoogte</td>
                            <td>Omschrijving</td>
                            <td>Gebruikt</td>
                            <td>Acties</td>
                        </tr>
                        {displayGiftCardItems(props)}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default GiftCard;