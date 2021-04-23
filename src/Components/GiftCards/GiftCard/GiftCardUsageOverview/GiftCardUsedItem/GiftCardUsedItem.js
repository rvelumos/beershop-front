import React from 'react';
import {v4 as uuidv4} from "uuid";

function GiftCardUsedItem(props) {

    const displayUsageGiftCardItems = (props) => {
        let {giftCardItems, setError} = props;

        if(giftCardItems.length  > 0) {
            giftCardItems = Array.from(giftCardItems);
            return (
                giftCardItems.map((giftCardItem) => {
                    console.log(giftCardItem);
                    let used = "Nee";
                    let class_gc = "GiftCardUsed";

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
            </div>
        </>
    )
}

export default GiftCardUsedItem;