import React from 'react';
import Products from "../Components/Products/Products";

const GiftPage = () => {

    return (
        <>
            <div className="contentContainer">
                <h1>Cadeaubonnen</h1>
                <p>Maak iemand blij met een cadeaubon. Een cadeaubon is eenmaal te gebruiken en is na uitgifte een jaar geldig.</p>
                <div className="giftCardContainer">
                    <div className="ProductOverview">
                        <Products type="4"  />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GiftPage;