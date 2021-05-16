import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import GiftCard from "./GiftCard/GiftCard";
import axios from "axios";
import GiftCardUsedItem from "./GiftCard/GiftCardUsageOverview/GiftCardUsedItem/GiftCardUsedItem";
import Feedback from "../Website/UI/Feedback/Feedback";


const GiftCards = ({isAdmin, token}) => {

    const [error, setError] = useState("");
    const [giftCardItems, setGiftCardItems] = useState("");
    const [loading, toggleLoading] = useState(false);

    // eslint-disable-next-line
    useEffect(() => {
        async function getGiftCards() {
            toggleLoading(true);

            let url = "/api/v1/products";

            if (isAdmin) {
                url = `${url}/type/4/`;
            } else {
                //fix!!!
                let id = 1;

                url = `${url}/giftcards/customer/${id}/`;
            }

            try {
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                })

                if (result) {
                    const giftCards = result.data.sort((a,b) => a.id-b.id);
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
                {error && <Feedback type="error" content={error} /> }
            </div>
        </>
    )
}

export default GiftCards;