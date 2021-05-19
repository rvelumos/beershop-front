import React, {useState, useEffect} from 'react';
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";
import Feedback from "../../Website/UI/Feedback/Feedback";

function AddEdit({isAddMode, section, itemData, id, token, setSaved, saved}) {

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [process, setProcess] = useState("pending");
    const [loading, toggleLoading] = useState(true);

    useEffect(() =>{
        async function handleData(itemData) {
            setProcess("data");

            let url = `/api/v1/admin/${section}`;
            if(!isAddMode)
                url = `${url}/${id}`;

            try {
                toggleLoading(true);
                let result;
                if(isAddMode) {
                    result = await axios.post(url, itemData, {
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                } else {
                    result = await axios.put(url, itemData, {
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                }
                if(result) {
                    setMessage("Data succesvol opgeslagen");
                }
            } catch (e) {
                console.error(e);
                setError("Fout bij verwerken data.");
            }
            toggleLoading(false);
        }
        if (process==="pending")
            handleData(itemData);
    // eslint-disable-next-line
    }, [])

    return(
        <>
            {error && <Feedback type="error" content={error} />}
            {loading ? <LoadingIndicator /> : <Feedback type="success" content={message} />}
        </>
    )
}

export default AddEdit;