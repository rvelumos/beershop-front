import React, {useState} from 'react';
import {
    Link
} from "react-router-dom";
import './UserInfo.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Feedback from "../../../Website/UI/Feedback/Feedback";

function UserInfo(props) {
    const [loading, toggleLoading] = useState(false);
    //const [userRoles, setUserRoles] = useState('');
    const [error, setError] = useState(true);
    const [message, setMessage] = useState("");

    const {token, isAdmin} = props;

    // function GetRolesUser(id) {
    //
    //     useEffect(() => {
    //         async function getRoles() {
    //
    //             toggleLoading(true);
    //
    //             let url = `/api/v1/users/${id}`;
    //
    //             try {
    //                 const result = await axios.get(url, {
    //                     headers : {
    //                         "Authorization" : `Bearer ${token}`,
    //                         'Content-Type': 'application/json',
    //                         "Access-Control-Allow-Origin": "*",
    //                     }
    //                 });
    //                 if (result.data.length > 0){
    //                     setUserRoles(result.data);
    //                 } else {
    //                     setUserRoles("Geen");
    //                     setError("Geen rollen gedefineerd");
    //                 }
    //                 console.log(userRoles);
    //             } catch (e) {
    //                 console.error(e);
    //                 setError("Fout bij ophalen gegevens.");
    //             }
    //             toggleLoading(false);
    //         }
    //
    //         getRoles();
    //
    //     // eslint-disable-next-line
    //     }, [userRoles]);
    // }

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

    const User = (props) => {
        const {users} = props;
        console.log(users);
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
                                <td><p className="userCP">{userInfo.customerPoints}</p></td>
                                <td><p className="userNewsletter">{userInfo.newsletter ? "X" : null}</p></td>
                                <td><p className="userRoles"></p></td>
                                <td>
                                    <div className="actionContainer">
                                        <div className="edit"><Link to={`/cms/users/edit/${userInfo.id}`}>&#9999;</Link></div>
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
                    <tr><td>Jouw punten</td><td>{users.customerPoints}</td></tr>
                    <tr><td>Nieuwsbrief:</td><td>{users.newsletter ? "Ja" : "Nee"}</td></tr>
                </>
            )
        }
    }
    return(
        <>
            {message && <Feedback type="success" content={message} />}
            {loading ? <LoadingIndicator/> :
                <div className="itemContainer">
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
                                    <td>Punten</td>
                                    <td>Nieuwsbrief</td>
                                    <td>Rollen</td>
                                    <td>Acties</td>
                                </tr>
                                {User(props)}
                                </tbody>
                            </table>
                        </>
                        :
                        <>
                            <table className="tableDetailsUser">
                                <tbody>
                                {User(props)}
                                </tbody>
                            </table>
                            <Link to="/mijn_account/gegevens/edit/" className="button">Aanpassen</Link>
                        </>
                    }

                </div>
            }
        </>
    )
}

export default UserInfo;