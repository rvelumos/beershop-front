import React, {useState} from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import UserInfo from "../../Components/Cms/UserManagement/UserInfo/UserInfo";
import LoadingIndicator from "../../Components/Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";

function UserSettingsPage ({token, username}) {

    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(true);
    const [userAddress, setUserAddress] = useState(true);
    const [mode, setMode] = useState('init');

    async function getCustomerAddressDetails(username, token){
        setError(false);
        toggleLoading(true);
        setMode('data');

        let url = `/api/v1/address/customer/${username}`;

        try {
            const result = await axios.get(url, {
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            })
            if(result.data[0] !== "") {
                setUserAddress(result.data[0]);
            }

        }catch(e) {
            console.error(e);
            setError("Fout bij ophalen adresgegevens.");
        }
        toggleLoading(false);
    }

    if(username !== undefined && mode === 'init') {
        getCustomerAddressDetails(username, token);
    }

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Jouw gegevens</h1>
                    <p>Onderstaande gegevens zijn bij ons bekend in het systeem.</p>
                    {error && <p className="errorContainer">{error}</p>}
                    {loading ? <LoadingIndicator /> : <UserInfo users={userAddress} setUserAddress={setUserAddress} />}
                </div>
            </div>
        </>
    )
}

export default UserSettingsPage;