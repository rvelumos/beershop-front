import React, {useState} from 'react';
import './GiftCardUsedItem.css';

function GiftCardUsedItem(props) {
    const {isAdmin} = props;
    const [errorMessage, setErrorMessage] = useState("");
    const [mode, setMode] = useState("init");

    const displayUsageGiftCardItems = (props) => {
        let {giftCardItems} = props;

        if(mode === 'init') {
            if (giftCardItems.length > 0) {
                giftCardItems = Array.from(giftCardItems);
                return (
                    giftCardItems.map((giftCardItem) => {
                        let used = "Nee";
                        let classGc = "Order";

                        let expiration_date = giftCardItem.expiration_date;
                        expiration_date = expiration_date.split('T')[0];

                        if (giftCardItem.uses > 0) {
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
                                    {isAdmin &&
                                        <td><p className="giftCardUser">{giftCardItem.username}</p></td>
                                    }
                                    <td><p className={classGc}>{used}</p></td>
                                </tr>
                            </React.Fragment>
                        )
                    })
                )
            } else {
                setErrorMessage("Geen cadeaubonnen gevonden");
                setMode('data');
            }
        }
    }
    return(
        <>
            <div className="itemContainer">
                {isAdmin ?
                <>
                <h1>Overzicht gekochte cadeaubonnen</h1>
                <table className="tableDetails">
                    <tbody>
                    <tr>
                        <td>ID</td>
                        <td>Naam</td>
                        <td>Hoogte</td>
                        <td>Code</td>
                        <td>Geldigheidsduur</td>
                        <td>Klant</td>
                        <td>Gebruikt</td>
                    </tr>
                    {displayUsageGiftCardItems(props)}
                    </tbody>
                </table>
                {errorMessage && <p className="errorMessage"> {errorMessage} </p>}
                </>
                :
                <>
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
                </>
                }
            </div>
        </>
    )
}

export default GiftCardUsedItem;