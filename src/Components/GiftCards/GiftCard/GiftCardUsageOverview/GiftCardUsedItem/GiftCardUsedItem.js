import React from 'react';
import './GiftCardUsedItem.css';

function GiftCardUsedItem(props) {
    const {isAdmin} = props;

    const displayUsageGiftCardItems = (props) => {
        let {giftCardItems, setError} = props;

        if(giftCardItems.length  > 0) {
            giftCardItems = Array.from(giftCardItems);
            return (
                giftCardItems.map((giftCardItem) => {
                    let used = "Nee";
                    let classGc = "Order";

                    let expiration_date = giftCardItem.expiration_date;
                    expiration_date = expiration_date.split('T')[0];

                    if(giftCardItem.uses > 0) {
                        classGc = "giftCardIsUsed";
                        used = "Ja";
                    }
                    return (
                        <React.Fragment key={giftCardItem.id}>
                            <tr className={classGc}>
                                {isAdmin &&
                                    <td><p className="giftCardId">{giftCardItem.id}</p></td>
                                }
                                <td><p className="giftCardName">{giftCardItem.name}</p></td>
                                <td><p className="giftCardAmount">€{giftCardItem.amount}</p></td>
                                <td><p className="giftCardCode">{giftCardItem.code}</p></td>
                                <td><p className="giftCardExpirationDate">{expiration_date}</p></td>
                                <td><p className={classGc}>{used}</p></td>
                            </tr>
                        </React.Fragment>
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
                {isAdmin ?
                <table className="tableDetails">
                    <tbody>
                    <tr>
                        <td>ID</td>
                        <td>Naam</td>
                        <td>Hoogte</td>
                        <td>Code</td>
                        <td>Geldigheidsduur</td>
                        <td>Gebruikt</td>
                    </tr>
                    {displayUsageGiftCardItems(props)}
                    </tbody>
                </table>
                :
                <table className="giftCardUsedItemDetails">
                    <tbody>
                    <tr>
                        <td>Naam</td>
                        <td>Hoogte</td>
                        <td>Code</td>
                        <td>Geldigheidsduur</td>
                        <td>Gebruikt</td>
                    </tr>
                    {displayUsageGiftCardItems(props)}
                    </tbody>
                </table>
                }
            </div>
        </>
    )
}

export default GiftCardUsedItem;