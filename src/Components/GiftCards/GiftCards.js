import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import GiftCard from "./GiftCard/GiftCard";
import Error from "../Website/UI/Feedback/Error/Error";
import axios from "axios";
import GiftCardUsedItem from "./GiftCard/GiftCardUsageOverview/GiftCardUsedItem/GiftCardUsedItem";


const GiftCards = ({isAdmin, token}) => {

    const [error, setError] = useState(false);
    const [giftCardItems, setGiftCardItems] = useState("");
    const [loading, toggleLoading] = useState(false);

    // eslint-disable-next-line
    useEffect(() => {
        async function getGiftCards() {

            setError(false);
            toggleLoading(true);

            let url = "http://localhost:8080/api/v1";

            if (isAdmin) {
                url = `${url}/products/type/4/`;
            } else {
                //fix!!!
                let id = 1;

                url = `${url}/giftcards/customer/${id}/`;
            }

            console.log(url);

            try {
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                })

                if (result) {
                    const giftCards = result.data;
                    console.log(giftCards);
                    setGiftCardItems(giftCards);
                    toggleLoading(false);
                }
            } catch {
                console.error(error);
                setError("could not reach external source");
            }
        }
        getGiftCards()
        // eslint-disable-next-line
    },[])

    return (
        <>
            <div className="overview">
                {loading ? <LoadingIndicator /> :
                    isAdmin ? <GiftCard token={token} giftCardItems={giftCardItems} error={error} setError={setError} />
                    : <GiftCardUsedItem giftCardItems={giftCardItems} error={error} setError={setError} />
                }
                {error && <Error type="message_container" content={error} /> }
            </div>
        </>
    )
}

export default GiftCards;