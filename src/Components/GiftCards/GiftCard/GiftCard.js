import React from 'react';
import './GiftCard.css';
import { v4 as uuidv4 } from 'uuid';

function GiftCard(props) {

    const displayGiftCardItems = (props) => {
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
                            <div key={uuidv4()} className={class_gc}>
                                <p className="giftCardName">{giftCardItem.name}</p>
                                <p className="giftCardAmount">{giftCardItem.amount}</p>
                                <p className="giftCardCode">{giftCardItem.code}</p>
                                <p className="giftCardExpirationDate">{expiration_date}</p>
                                <p className="giftCardUsed">{used}</p>
                            </div>
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
            {displayGiftCardItems(props)}
        </>
    )
}

export default GiftCard;