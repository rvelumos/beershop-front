import React, {useState, useEffect} from 'react';
import './GiftCardUsageOverview.css';
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../../../Website/UI/Feedback/Error/Error";
import GiftCardUsedItem from "./GiftCardUsedItem/GiftCardUsedItem";
import {useParams} from "react-router";

function GiftCardUsageOverview({isAdmin, token}) {

    const { id } = useParams();

    const [error, setError] = useState(false);
    const [giftCardItems, setGiftCardItems] = useState("");
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        async function getGiftCards() {
            setError(false);
            toggleLoading(true);

            let url = `/api/v1/admin/giftcards/${id}/`;

            console.log(url);

            try {
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                if (result.data.length > 0) {
                    setGiftCardItems(result.data);
                }
            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
            }
            toggleLoading(false);
        }

        getGiftCards();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="overview">
                {loading ? <LoadingIndicator/> :
                    <GiftCardUsedItem giftCardItems={giftCardItems} error={error} isAdmin={isAdmin} setError={setError}/>}
                {error && <Error type="message_container" content={error}/>}
            </div>
        </>
    )
}

export default GiftCardUsageOverview;