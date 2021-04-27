import React, {useEffect, useState} from 'react';
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import NewsletterTemplate from "./NewsletterTemplate/NewsletterTemplate";

const NewsletterOverview = ({token}) => {
    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(false);
    const [items, setItems] = useState(false);

    useEffect(() => {
        async function getNewsletterInfo() {
            const url = `/api/v1/admin/newsletters/`;
            try {
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                    }
                })

                if (result) {
                    console.log(result.data);
                    setItems(result);
                    toggleLoading(false);
                }
            } catch {
                console.error(error);
                setError("could not reach external source");
            }

        }
        getNewsletterInfo()
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