import React, {useState} from 'react';
import './NewsletterSubscribers.css';
import axios from "axios";
import LoadingIndicator from "../../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Feedback from "../../../../Website/UI/Feedback/Feedback";

function NewsletterSubscribers(props) {
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function deleteSubscriber(id){
        const {token} = props;

        toggleLoading(true);
        const url = `/api/v1/admin/subscriber/${id}`;

        try {
            const result = await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(result) {
                setMessage("Inschrijver is verwijderd... moment");
                setTimeout(function () {
                    window.location.reload();
                }, 1000);

            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwijderen inschrijver.");
            toggleLoading(false);
        }
    }

    const displaySubscribers = (props) => {
        let {subscribers} = props;

        if(subscribers.length  > 0) {
            return (
                subscribers.map((subscriber) => {
                    return (
                        <React.Fragment key={subscriber.id}>
                            <tr className={subscriber}>
                                <td><p className="subscriberId">{subscriber.id}</p></td>
                                <td><p className="subscriberName">{subscriber.email}</p></td>
                                <td>
                                    <div className="actionContainer">
                                        <div className="delete" onClick={(e) => deleteSubscriber(subscriber.id)}>&#10008;</div>
                                    </div></td>
                            </tr>
                        </React.Fragment>
                    )
                })
            )
        } else {
            return(
                <td colSpan="3"><p>Geen inschrijvingen gevonden</p></td>
            )
        }
    }
    return(
        <>
            {loading ? <LoadingIndicator/>
                :
                <>
                    {message && <p className="notice"> {message} </p>}
                    <div className="itemContainer">
                        {error && <Feedback type="error" content={error} />}
                        <table className="tableDetailsSmall">
                            <tbody>
                            <tr>
                                <td>ID</td>
                                <td>Naam</td>
                                <td>Actie</td>
                            </tr>
                            {displaySubscribers(props)}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </>
    )
}

export default NewsletterSubscribers;