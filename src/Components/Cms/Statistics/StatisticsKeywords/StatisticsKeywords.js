import React, {useState} from 'react';
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";
import Feedback from "react-bootstrap/Feedback";

function StatisticsKeywords({token}) {
    const [loading, toggleLoading] = useState(true);
    const [items, setItems] = useState("");
    const [error, setError] = useState("");
    const [mode, setMode] = useState('init');

    async function getTop10Keywords() {
        setMode('data');
        const url = `/api/v1/keywords/top`;

        try {
            const result = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            });
            console.log(result)
            if (result.data.length > 0) {
                toggleLoading(false)
                setItems(result.data);
            }
        } catch (e) {
            console.error(e);
            setError("could not reach external source");
        }
    }

    if(mode === 'init')
        getTop10Keywords()
    // select keyword, sum (amount) as aantal from search group by keyword order by aantal DESC

    function displaySearchResults() {
        if(items.length > 0) {
            const searchItems = Array.from(Object.entries(items));
            return (
                searchItems.map((item, i) => {
                    return (
                        <p>{item[1].keywordName} ({item[1].keywordAmount}x)</p>
                    )
                })
            )
        }
    }

    return(
        <>
            {error && <Feedback type="error" content={error} />}
            {loading ? <LoadingIndicator /> : displaySearchResults()}
        </>
    )
}

export default StatisticsKeywords;