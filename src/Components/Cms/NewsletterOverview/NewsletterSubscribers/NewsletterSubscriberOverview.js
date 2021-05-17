import React, {useState, useEffect} from 'react';
import './NewsletterSubscriberOverview.css';
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Feedback from "../../../Website/UI/Feedback/Feedback";
import NewsletterSubscribers from "./NewsletterSubscribers/NewsletterSubscribers";

function NewsletterSubscriberOverview({token}) {

    const [error, setError] = useState("");
    const [subscribers, setSubscribers] = useState("");
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        async function getSubscribers() {
            toggleLoading(true);

            const url = `/api/v1/admin/newsletter/subscribers`;

            try {
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                if (result.data.length > 0) {
                    setSubscribers(result.data);
                }
            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
            }
            toggleLoading(false);
        }

        getSubscribers();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="overview">
                {loading ? <LoadingIndicator/> :
                    <><NewsletterSubscribers token={token} subscribers={subscribers} />
                    {error && <Feedback type="error" content={error} />}
                    </>}
            </div>
        </>
    )
}

export default NewsletterSubscriberOverview;