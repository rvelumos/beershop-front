import React, {useState} from 'react';
import {
    Link
} from "react-router-dom";
import './UserInfo.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";

function UserInfo(props) {
    const [loading, toggleLoading] = useState(false);
    //const [userRoles, setUserRoles] = useState('');
    const [error, setError] = useState(true);
    const [message, setMessage] = useState(true);

    const {token} = props;

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
        let url = `/api/v1/admin/customer/${id}`;

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
            return(
                users.map((userInfo) => {
                    return (
                        <tr key={uuidv4()} className="Order">
                            <td><p className="userID">{userInfo.id}</p></td>
                            <td><p className="userSex">{userInfo.sex}</p></td>
                            <td><p className="userFirstName">{userInfo.firstname}</p></td>
                            <td><p className="userLastName">{userInfo.lastname}</p></td>
                            <td><p className="userBirthDate">{userInfo.birth_date}</p></td>
                            <td><p className="userEmail">{userInfo.email}</p></td>
                            <td><p className="userPhone">{userInfo.phone}</p></td>
                            <td><p className="userAddress">{userInfo.address}</p></td>
                            <td><p className="userCP">{userInfo.customer_points}</p></td>
                            <td><p className="userNewsletter">{userInfo.newsletter ? "X" : null}</p></td>
                            <td><p className="userRoles"></p></td>
                            <td>
                                <div className="actionContainer">
                                    <div class="edit"><Link to={`/cms/users/edit/${userInfo.id}`}>&#9999;</Link></div>
                                    <div class="delete" onClick={(e) => deleteUser(userInfo.id)}>&#10008;</div>
                                </div>
                            </td>
                        </tr>
                    )
            })
            )
    }
    return(
        <>
            {message && <p> {message} </p>}
            {loading ? <LoadingIndicator/> :
                <div className="itemContainer">
                    {error && <p> {error} </p>}
                    <Link to="/cms/users/create/" className="button">Gebruiker toevoegen</Link><br /><br />
                    <table className="tableDetails">
                        <tr>
                            <td>&nbsp;</td>
                            <td>Geslacht</td>
                            <td>Voornaam</td>
                            <td>Achternaam</td>
                            <td>Geboortedatum</td>
                            <td>E-mail</td>
                            <td>Telefoon</td>
                            <td>Adres</td>
                            <td>Punten</td>
                            <td>Nieuwsbrief</td>
                            <td>Rollen</td>
                            <td>Acties</td>
                        </tr>
                        {User(props)}
                    </table>
                </div>
            }
        </>
    )
}

export default UserInfo;