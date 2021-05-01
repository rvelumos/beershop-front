import axios from "axios";
import {v4 as uuidv4} from "uuid";
import {Link} from "react-router-dom";
import React from "react";

function NewsletterTemplate ({items, setItems, error, setError}) {
    async function getSubscribers(id) {
        const url = `/api/v1/admin/newsletter/${id}`;
        try {
            const result = await axios.get(url);

            if (result) {
                console.log(result);
                setItems(result);
                return (result);
            }
        } catch {
            console.error(error);
            setError("could not reach external source");
        }
    }

    const newsletters = () => {
       // const newsletterItems = Array.from(items);
        console.log(items);
        if (items.length > 0) {
            return (
                items.map((item) => {
                    return (
                        <tr key={uuidv4()} className="Order">
                            <td><p className="userID">{item.id}</p></td>
                            <td><p className="newsTitle">{item.title}</p></td>
                            <td><p className="newsBody">{item.body}</p></td>
                            <td><p className="newsSubscribers">{getSubscribers(item.id)}</p></td>
                            <td><p className="newsSubscribers"><Link to={`/cms/newsletter/${item.id}/send_bulk`}>Verstuur mails</Link></p></td>
                            <td>
                                <div className="actionContainer">
                                    <div class="edit"><Link to={`/cms/newsletter/edit/${item.id}`}>&#9999;</Link></div>
                                    {/*<div class="delete" onClick={(e) => deleteNewsletter(item.id)}>&#10008;</div>*/}
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
            <div className="overview">
                <table className="tableDetails">
                    <tbody>
                    <tr>
                        <td>ID</td>
                        <td>Titel</td>
                        <td>Inhoud</td>
                        <td>Aantal inschrijvingen</td>
                        <td>Bulkmail</td>
                        <td>Actie</td>
                    </tr>
                    {newsletters()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default NewsletterTemplate;