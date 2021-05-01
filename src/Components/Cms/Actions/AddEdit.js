import React, {useState} from 'react';
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";

function AddEdit({isAddMode, section, action, itemData, id, token, setSaved}) {

    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const [process, setProcess] = useState("pending");
    const [loading, toggleLoading] = useState("pending");

    if (process==="pending")
        handleData(itemData);

    console.log("addedit component");

    async function handleData(itemData) {
        setProcess("data");
        let action = "create";
        if(!isAddMode)
            action = "edit";

        let url = `/api/v1/admin/${section}/${action}`;
        if(!isAddMode)
            url = `${url}/${id}`;

        console.log(url);

        try {
            toggleLoading(true);
            let result="";
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
            setSaved(true);
            setMessage("Data succesvol opgeslagen");
            console.log(result);
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken data.");
        }
        toggleLoading(false);
    }

    return(
        <>
            {error && <p className="error">{error}</p>}
            {loading ? <LoadingIndicator /> : <p>{message}</p>}
        </>
    )
}

export default AddEdit;