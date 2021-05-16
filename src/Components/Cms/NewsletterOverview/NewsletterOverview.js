import React, {useEffect, useState} from 'react';
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import NewsletterTemplate from "./NewsletterTemplate/NewsletterTemplate";

function NewsletterOverview ({token}) {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const [items, setItems] = useState(false);

    useEffect(() => {
        async function getNewsletterInfo() {
            toggleLoading(true);

            const url = `/api/v1/admin/newsletters/`;

            try {
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });

                if (result.data.length > 0) {
                    console.log(result);
                    setItems(result.data);
                }
                toggleLoading(false);
            } catch(e) {
                console.error(e);
                setError("could not reach external source");
            }
            toggleLoading(false);
        }
        getNewsletterInfo();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="overview">
                {loading ? <LoadingIndicator /> : <NewsletterTemplate error={error} items={items} setItems={setItems} setError={setError} />}
            </div>
        </>
    )
}

export default NewsletterOverview;