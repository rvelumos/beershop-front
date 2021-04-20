import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../Website/UI/LoadingIndicator/LoadingIndicator";
import GiftCard from "./GiftCard/GiftCard";
import Error from "../Website/UI/Feedback/Error/Error";
import axios from "axios";


const GiftCards = ({isAdmin, token}) => {

    const [error, setError] = useState(false);
    const [giftCardItems, setGiftCardItems] = useState("");
    const [loading, toggleLoading] = useState(false);

    // eslint-disable-next-line
    useEffect(getGiftCards, []);

    function getGiftCards () {

        setError(false);
        toggleLoading(true);

        let url = "http://localhost:8080/api/v1";

        if (isAdmin) {
            url = `${url}/products/type/4/`;
        } else {
            //fix!!!
            let customer_id = 1;

            url = `${url}/giftcards/customer/${customer_id}/`;
        }

        console.log(url);

        axios.get(url, {
            headers : {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => {
                const giftCards = response.data;
                console.log(giftCards);
                setGiftCardItems(giftCards);
                toggleLoading(false);
            })
            .catch((errorResponse) => {
                console.error(errorResponse);
                setError("could not reach external source");
            });
    }

    return (
        <>
            <div className="overview">
                {loading ? <LoadingIndicator /> : <GiftCard giftCardItems={giftCardItems} error={error} setError={setError} />}
                {error && <Error type="message_container" content={error} /> }
            </div>
        </>
    )
}

export default GiftCards;