import React from 'react';
import Gift from "../Components/Products/Product/Gift/Gift";

const GiftPage = () => {

    return (
        <>
            <div className="contentContainer">
                <h1>Cadeaubonnen</h1>
                <p>Maak iemand blij met een cadeaubon. Een cadeaubon is eenmaal te gebruiken en is na uitgifte een jaar geldig.</p>
                <div className="giftCardContainer">
                    <Gift name="Cadeaubon 10 euro" description="Voor alle producten te gebruiken" price="10" />
                    <Gift name="Cadeaubon 15 euro" description="Voor alle producten te gebruiken" price="15" />
                    <Gift name="Cadeaubon 25 euro" description="Voor alle producten te gebruiken" price="25" />
                    <Gift name="Cadeaubon 35 euro" description="Voor alle producten te gebruiken" price="35" />
                    <Gift name="Cadeaubon 50 euro" description="Voor alle producten te gebruiken" price="50" />
                    <Gift name="Cadeaubon 100 euro" description="Voor alle producten te gebruiken" price="100" />
                </div>
            </div>
        </>
    )
}

export default GiftPage;