import React, {useState} from 'react';
import {
    Link
} from "react-router-dom";
import './UserInfo.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Feedback from "../../../Website/UI/Feedback/Feedback";

function UserInfo({users, isAdmin, token}) {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function deleteUser(id) {
        toggleLoading(true);
        const url = `/api/v1/admin/customer/${id}`;

        try {
            const result = await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(result) {
                setMessage("Gebruiker is verwijderd... moment");
                setTimeout(function () {
                    window.location.reload();
                }, 1000);

            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwijderen gebruiker.");
            toggleLoading(false);
        }
    }

    const User = () => {
        if(isAdmin) {
            return(
                users.map((userInfo) => {
                    return (
                        <tr key={uuidv4()} className="Order">
                            <td><p className="userID">{userInfo.id}</p></td>
                            <td><p className="userSex">{userInfo.sex}</p></td>
                            <td><p className="userFirstName">{userInfo.firstname}</p></td>
                            <td><p className="userLastName">{userInfo.lastname}</p></td>
                            <td><p className="userBirthDate">{userInfo.birthDate}</p></td>
                            <td><p className="userEmail">{userInfo.email}</p></td>
                            <td><p className="userPhone">{userInfo.phone}</p></td>
                            <td><p className="userNewsletter">{userInfo.newsletter ? "X" : null}</p></td>
                            <td>
                                <div className="actionContainer">
                                    <div className="edit"><Link to={`/cms/users/edit/${userInfo.username}`}>&#9999;</Link></div>
                                    <div className="delete" onClick={(e) => deleteUser(userInfo.id)}>&#10008;</div>
                                </div>
                            </td>
                        </tr>
                    )
                })
            )
        }else {
            return(
                <>
                    <tr><td>Geslacht</td><td>{users.sex}</td></tr>
                    <tr><td>Voornaam:</td><td>{users.firstname}</td></tr>
                    <tr><td>Achternaam:</td><td>{users.lastname}</td></tr>
                    <tr><td>Geboortedatum:</td><td>{users.birthDate}</td></tr>
                    <tr><td>E-mailadres:</td><td>{users.email}</td></tr>
                    <tr><td>Telefoonnummer:</td><td>{users.phone}</td></tr>
                    <tr><td>Nieuwsbrief:</td><td>{users.newsletter ? "Ja" : "Nee"}</td></tr>
                    <tr><td><h2>Adresgegevens</h2></td></tr>
                    <tr><td>Straat</td><td>{users.address.street}</td></tr>
                    <tr><td>Straat (toevoeging):</td><td>{users.address.streetAdd}</td></tr>
                    <tr><td>Postcode:</td><td>{users.address.postalCode}</td></tr>
                    <tr><td>Huisnummer:</td><td>{users.address.number}</td></tr>
                    <tr><td>Stad:</td><td>{users.address.city}</td></tr>
                    <tr><td>Provincie:</td><td>{users.address.province}</td></tr>
                    <tr><td>Land:</td><td>{users.address.country}</td></tr>
                </>
            )
        }
    }
    return(
        <>
            {message && <Feedback type="success" content={message} />}
            {loading ? <LoadingIndicator/> :
                <div className="itemContainer">
                    {isAdmin && <h1>Overzicht gebruikers</h1>}
                    {error && <p> {error} </p>}
                    {isAdmin ?
                        <>
                            <Link to="/cms/users/create/" className="button">Gebruiker toevoegen</Link><br /><br />
                            <table className="tableDetails">
                                <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>Geslacht</td>
                                    <td>Voornaam</td>
                                    <td>Achternaam</td>
                                    <td>Geboortedatum</td>
                                    <td>E-mail</td>
                                    <td>Telefoon</td>
                                    <td>Nieuwsbrief</td>
                                    <td>Acties</td>
                                </tr>
                                {User()}
                                </tbody>
                            </table>
                        </>
                        :
                        <>
                            <table className="tableDetailsUser">
                                <tbody>
                                {User()}
                                </tbody>
                            </table>
                            <Link to={{pathname: `/mijn_account/gegevens/edit/`,
                                state: {
                                    formValue: users,
                                    }
                            }} className="button">Aanpassen</Link>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default UserInfo;