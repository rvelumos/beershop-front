import React, {useState} from 'react';
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";

function StatisticsKeywords({token}) {
    const [loading, toggleLoading] = useState(true);
    const [items, setItems] = useState("");
    const [error, setError] = useState("");

    async function getTop10Keywords() {
        toggleLoading(true);

        const url = `/api/v1/keywords/top`;

        try {
            const result = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            });

            if (result.data.length > 0) {
                setItems(result.data);
            }
            toggleLoading(false);
        } catch(e) {
            console.error(e);
            setError("could not reach external source");
        }
        toggleLoading(false);
    }
    // select keyword, sum (amount) as aantal from search group by keyword order by aantal DESC

    return(
        loading ? <LoadingIndicator /> : getTop10Keywords()
    )
}

export default StatisticsKeywords;