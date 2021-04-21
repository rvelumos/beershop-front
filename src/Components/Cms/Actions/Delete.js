import React, {useState} from 'react';
import axios from "axios";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";

function DeleteItem(props) {
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    async function deleteRecord({id, section, token}) {
        toggleLoading(true);

        let url = `http://localhost:8080/api/v1/${section}/${id}`;

        try {
            const result = await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (result.data.length > 0) {

            } else {
                setError("Item niet gevonden");
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij ophalen gegevens.");
        }
        toggleLoading(false);
    }

    return (
        <>
            {error && <p>Fout bij verwijderen van item.</p>}
            {loading ? <LoadingIndicator /> : deleteRecord(props)}
        </>
    )
}


export default DeleteItem;