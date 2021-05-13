import React, {useState} from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import UserInfo from "../../Components/Cms/UserManagement/UserInfo/UserInfo";
import LoadingIndicator from "../../Components/Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";

function UserSettingsPage ({token, username}) {

    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(true);
    const [user, setUser] = useState(true);
    const [mode, setMode] = useState('init');

    async function getUserDetails(username, token){
        setError(false);
        toggleLoading(true);
        setMode('data');

        let url = `/api/v1/customer/${username}`;

        try {
            const result = await axios.get(url, {
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            })
            if(result.data[0] !== "") {
                setUser(result.data[0]);
                //getUserAddress(result.data[0].id);
            }

        }catch(e) {
            console.error(e);
            setError("Fout bij ophalen gegevens.");
        }
        toggleLoading(false);
    }
    if(username !== undefined && mode === 'init')
        getUserDetails(username, token);


    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Jouw gegevens</h1>
                    <p>Onderstaande gegevens zijn bij ons bekend in het systeem.</p>
                    {error && <p className="errorContainer">{error}</p>}
                    {loading ? <LoadingIndicator /> : <UserInfo users={user} setUsers={setUser}  />}
                </div>
            </div>
        </>
    )
}

export default UserSettingsPage;