import React from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import GiftCards from "../../Components/GiftCards/GiftCards";


const UserGiftPage = ({token}) => {

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Cadeaubonnen</h1>
                    <p>Overzicht van jouw cadeaubonnen</p>

                    <GiftCards token={token} />
                </div>
            </div>
        </>
    )
}

export default UserGiftPage;