import React from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import GiftCards from "../../Components/GiftCards/GiftCards";


const UserGiftPage = () => {

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Cadeaubonnen</h1>
                    <p>Overzicht van jouw cadeaubonnen</p>

                    <div className="GiftCardTop">
                        <p className="giftCardName">Naam</p>
                        <p className="giftCardAmount">Waarde</p>
                        <p className="giftCardCode">Code</p>
                        <p className="giftCardExpirationDate">Geldig tot</p>
                        <p className="giftCardUsed">Gebruikt</p>
                    </div>
                    <GiftCards />
                </div>
            </div>
        </>
    )
}

export default UserGiftPage;