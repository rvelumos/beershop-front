import React from 'react';
import './GiftCard.css';
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";
import  DeleteItem  from "../../Cms/Actions/Delete";

function GiftCardUsages(props) {

    function deleteGiftCard(id){
        const {token} = props;
        return (
            <DeleteItem section="giftcards" id={id} token={token}></DeleteItem>
        )
    }

    const displayUsageGiftCardItems = (props) => {
        let {giftCardItems, setError} = props;

        if(giftCardItems.length  > 0) {
            giftCardItems = Array.from(giftCardItems);
            return (
                giftCardItems.map((giftCardItem) => {
                    console.log(giftCardItem);
                    let used = "Nee";
                    let class_gc = "GiftCard";

                    let expiration_date = giftCardItem.expiration_date;
                    expiration_date = expiration_date.split('T')[0];

                    if(giftCardItem.uses > 0) {
                        class_gc = "GiftCard used";
                        used = "Ja";
                    }
                    return (
                        <>
                            <tr key={uuidv4()} className="Order">
                                <td><p className="giftCardID">{giftCardItem.id}</p></td>
                                <td><p className="giftCardName">{giftCardItem.name}</p></td>
                                <td><p className="giftCardAmount">{giftCardItem.amount}</p></td>
                                <td><p className="giftCardCode">{giftCardItem.code}</p></td>
                                <td><p className="giftCardExpirationDate">{expiration_date}</p></td>
                                <td><p className="giftCardUsed">{used}</p></td>
                                <td>
                                    <div className="actionContainer">
                                        <div className="edit"><Link to={`/cms/users/edit/${giftCardItem.id}`}>&#9999;</Link>
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
                <Link to="/cms/giftcards/add/customer/" className="button">Cadeaukaart koppelen</Link><br /><br />
                <table className="tableDetails">
                    <tr>
                        <td>&nbsp;</td>
                        <td>Naam</td>
                        <td>Hoogte</td>
                        <td>Code</td>
                        <td>Geldigheidsduur</td>
                        <td>Gebruikt</td>
                        <td>Acties</td>
                    </tr>
                    {displayUsageGiftCardItems(props)}
                </table>
            </div>
        </>
    )
}

export default GiftCard;