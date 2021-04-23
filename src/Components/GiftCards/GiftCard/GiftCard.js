import React from 'react';
import './GiftCard.css';
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";
import  DeleteItem  from "../../Cms/Actions/Delete";

function GiftCard(props) {

    function deleteGiftCard(id){
        const {token} = props;
        return (
            <DeleteItem section="giftcards" id={id} token={token} />
        )
    }

    const displayGiftCardItems = (props) => {
        let {giftCardItems, setError} = props;

        if(giftCardItems.length  > 0) {
            giftCardItems = Array.from(giftCardItems);
            return (
                giftCardItems.map((giftCardItem) => {
                    return (
                        <>
                            <tr key={uuidv4()} className="Order">
                                <td><p className="giftCardID">{giftCardItem.id}</p></td>
                                <td><p className="giftCardName">{giftCardItem.name}</p></td>
                                <td><p className="giftCardPrice">{giftCardItem.price}</p></td>
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
                        </>
                    )
                })
            )
        } else {
            setError("Geen cadeaubonnen gevonden");
        }
    }
    return(
        <>
            <div className="itemContainer">
                <Link to="/cms/giftcards/create/" className="button">Cadeaukaart toevoegen</Link><br /><br />
                <table className="tableDetails">
                    <tr>
                        <td>&nbsp;</td>
                        <td>Naam</td>
                        <td>Hoogte</td>
                        <td>Omschrijving</td>
                        <td>Gebruikt</td>
                        <td>Acties</td>
                    </tr>
                    {displayGiftCardItems(props)}
                </table>
            </div>
        </>
    )
}

export default GiftCard;