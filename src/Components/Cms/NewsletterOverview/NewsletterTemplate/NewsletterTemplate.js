import axios from "axios";
import {v4 as uuidv4} from "uuid";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";

function NewsletterTemplate (props) {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function deleteNewsletter(id){
        const {token} = props;

        toggleLoading(true);
        const url = `/api/v1/admin/newsletter/${id}`;

        try {
            const result = await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(result) {
                setMessage("Nieuwsbrief is verwijderd... moment");
                setTimeout(function () {
                    window.location.reload();
                }, 1000);

            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwijderen nieuwsbrief.");
            toggleLoading(false);
        }
    }

    const getNewsletters = () => {
        let {items} = props;

        if (items !== undefined) {
            const newsletterItems = Array.from(items);
            return (
                newsletterItems.map((item) => {
                    let sentDate;
                    if(item.sent_date !== null)sentDate = item.sent_date.split('.')[0].replace("T", " ");

                    return (
                        <tr key={uuidv4()} className="Order">
                            <td><p className="userID">{item.id}</p></td>
                            <td><p className="newsTitle">{item.name}</p></td>
                            <td><p className="newsBody">{item.content}</p></td>
                            <td><p className="newsSubscribers"><Link to={`/cms/newsletter/subscribers`}>Inschrijvingen</Link></p></td>
                            <td><p className="newsBulk"><Link to={`/cms/newsletter/${item.id}/send_bulk`}>Verstuur mails</Link></p></td>
                            <td><p className="newsSent">{sentDate}</p></td>
                            <td>
                                <div className="actionContainer">
                                    <div className="edit"><Link to={`/cms/newsletter/edit/${item.id}`}>&#9999;</Link></div>
                                    <div className="delete" onClick={(e) => deleteNewsletter(item.id)}>&#10008;</div>
                                </div>
                            </td>
                        </tr>
                    )
                })
            )
        }
    }

    return (
        <>
            {message && <p className="notice"> {message} </p>}
            {loading ? <LoadingIndicator/> :
                <div className="itemContainer">
                    {error && <p> {error} </p>}
                    <Link to="/cms/newsletter/create/" className="button">Nieuwsbrief toevoegen</Link><br/><br/>
                    <table className="tableDetails">
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td>Titel</td>
                            <td>Inhoud</td>
                            <td>Inschrijvingen</td>
                            <td>Bulkmail</td>
                            <td>Verzonden op:</td>
                            <td>Actie</td>
                        </tr>
                        {getNewsletters()}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default NewsletterTemplate;