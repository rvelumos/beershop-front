import React from 'react';
import {v4 as uuidv4} from "uuid";
import './GiftCardUsedItem.css';

function GiftCardUsedItem(props) {
    const {isAdmin} = props;

    const displayUsageGiftCardItems = (props) => {
        let {giftCardItems, setError} = props;

        if(giftCardItems.length  > 0) {
            giftCardItems = Array.from(giftCardItems);
            return (
                giftCardItems.map((giftCardItem) => {
                    console.log(giftCardItem);
                    let used = "Nee";
                    let class_gc = "Order";

                    let expiration_date = giftCardItem.expiration_date;
                    expiration_date = expiration_date.split('T')[0];

                    if(giftCardItem.uses > 0) {
                        class_gc = "giftCardIsUsed";
                        used = "Ja";
                    }
                    return (
                        <>
                            <tr key={uuidv4()} className={class_gc}>
                                <td><p className="giftCardName">{giftCardItem.name}</p></td>
                                <td><p className="giftCardAmount">€{giftCardItem.amount}</p></td>
                                <td><p className="giftCardCode">{giftCardItem.code}</p></td>
                                <td><p className="giftCardExpirationDate">{expiration_date}</p></td>
                                <td><p className={class_gc}>{used}</p></td>
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
                {/*<Link to="/cms/giftcards/add/" className="button">Cadeaukaart toevoegen</Link><br /><br />*/}
                {isAdmin ?
                <table className="tableDetails">
                    <tr>
                        <td>&nbsp;</td>
                        <td>Naam</td>
                        <td>Hoogte</td>
                        <td>Code</td>
                        <td>Geldigheidsduur</td>
                        <td>Gebruikt</td>
                    </tr>
                    {displayUsageGiftCardItems(props)}
                </table>
                :
                <table className="giftCardUsedItemDetails">
                    <tr>
                        <td>Naam</td>
                        <td>Hoogte</td>
                        <td>Code</td>
                        <td>Geldigheidsduur</td>
                        <td>Gebruikt</td>
                    </tr>
                {displayUsageGiftCardItems(props)}
                </table>
                }

            </div>
        </>
    )
}

export default GiftCardUsedItem;