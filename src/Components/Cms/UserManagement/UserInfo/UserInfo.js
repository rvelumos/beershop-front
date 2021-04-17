import React, {useEffect, useState} from 'react';
import './UserInfo.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";

function UserInfo(props) {
    const [loading, toggleLoading] = useState(true);
    const [userRoles, setUserRoles] = useState('');
    const [error, setError] = useState(true);

    function GetRolesUser(id, token) {

        useEffect(() => {
            async function getRoles() {

                toggleLoading(true);

                let url = `/api/v1/users/${id}`;

                try {
                    const result = await axios.get(url, {
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                    if (result.data.length > 0){
                        setUserRoles(result.data);
                    } else {
                        setUserRoles("");
                        setError("Geen rollen gedefineerd");
                    }
                    console.log(userRoles);
                    toggleLoading(false);
                } catch (e) {
                    console.error(e);
                    setError("Fout bij ophalen gegevens.");
                    toggleLoading(false);
                }
            }

            getRoles();

            // eslint-disable-next-line
        }, [userRoles]);
    }

    const User = (props) => {
        const {users} = props;
            return(
                users.map((userInfo) => {
                    return (
                        <tr key={uuidv4()} className="Order">
                            <td><p className="userID">{userInfo.id}</p></td>
                            <td><p className="userFirstName">{userInfo.firstname}</p></td>
                            <td><p className="userLastName">{userInfo.lastname}</p></td>
                            <td><p className="userBirthDate">{userInfo.birth_date}</p></td>
                            <td><p className="userEmail">{userInfo.email}</p></td>
                            <td><p className="userPhone">{userInfo.phone}</p></td>
                            <td><p className="userAddress">{userInfo.address}</p></td>
                            <td><p className="userCP">{userInfo.customer_points}</p></td>
                            <td><p className="userNewsletter">{userInfo.newsletter ? "X" : null}</p></td>
                            <td><p className="userRoles">{GetRolesUser()}</p></td>
                            <td><p className="userActions">Edit Delete</p></td>
                        </tr>
                    )
            })
            )
    }
    return(
        <>
            {error && <p> {error} </p>}
            {loading? <LoadingIndicator />:
            <div className="userContainer">
                <table className="UserDetails">
                    <tr>
                        <td>ID</td>
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
            </div>}
        </>
    )
}

export default UserInfo;