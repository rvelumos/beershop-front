import React, {useState} from 'react';
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";

function AddEdit({isAddMode, section, itemData, id, token}) {

    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const [process, setProcess] = useState("pending");

    if (process==="pending")
        handleData(itemData);

    console.table(itemData);

    async function handleData(itemData) {
        setProcess("data");
        let url = `http://localhost:3000/api/v1/admin/${section}/`;
        if(!isAddMode)
            url = `${url}/${id}`;

        console.log(url);

        try {
            let result="";
            if(isAddMode) {
                result = await axios.post(url, {
                    itemData
                }, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                result = await axios.put(url, {
                    itemData
                }, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            setMessage("Data succesvol opgeslagen");
            console.log(result);
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken gegevens.");
        }
    }

    return(
        <>
            error && <p className="error">{error}</p>
            loading ? <LoadingIndicator /> : <p>{message}</p>
        </>
    )
}

export default AddEdit;