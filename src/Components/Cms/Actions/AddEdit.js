import React, {useState} from 'react';
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";

function AddEdit({isAddMode, section, itemData, id}) {

    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const [process, setProcess] = useState("pending");

    if (process=="pending")
        handleData(itemData);

    async function handleData(itemData) {
        setProcess("data");
        let url = `http://localhost:8080/api/v1/${section}/`;
        if(!isAddMode)
            url = `${url}/${id}`;

        console.log(url);

        try {
            let result = await axios.put(url, {
                itemData
            });

            if(isAddMode) {
                let result = await axios.post(url, {
                    itemData
                });
            }
            setMessage("Data succesvol opgeslagen");
            console.log(result);
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken gegevens.");
        }
        toggleLoading(false);
    }

    return(
        <>
            error && <p className="error">{error}</p>
            loading ? <LoadingIndicator /> : <p>{message}</p>
        </>
    )
}

export default AddEdit;