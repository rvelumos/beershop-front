import React, {useEffect, useState} from 'react';
import './Modal.css';
import axios from "axios";
import LoadingIndicator from "../Components/Website/UI/LoadingIndicator/LoadingIndicator";

function Modal({handler, section, id, title, token}) {

    const [item, setItem] = useState();
    const [error, setError] = useState();
    const [loading, toggleLoading] = useState();

    useEffect(() => {
        async function getItemInfo() {
            let url = `/api/v1/admin/${section}/${id}/`;

            console.log(url);

            try {
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                if (result.data.length > 0) {
                    setItem(result.data);
                }
            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
            }
            toggleLoading(false);
        }
        getItemInfo()
        // eslint-disable-next-line
    },[])

    function itemRows() {
        if(item !== undefined) {
            for (const [key, value] of Object.entries(item)) {
                return(
                    <tr><td>{key}</td><td>{value}</td></tr>
                )
            }
        } else {
            return (
                <p class='errorContainer'>Geen gegevens gevonden</p>
            )
        }
    }

    return (
        <div className="modal_backdrop">
            <div className="modal" >
                <div className="close" onClick={handler}>&#10008;</div>
                <p>{title}</p>
                {error && <p>{error}</p>}
                <table>
                    <tbody>
                    {loading ? <LoadingIndicator /> : itemRows()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Modal;