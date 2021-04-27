import React, {useEffect, useState} from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import UserInfo from "../../Components/Cms/UserManagement/UserInfo/UserInfo";
import LoadingIndicator from "../../Components/Website/UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";

function UserSettingsPage ({token}) {

    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(true);
    const [user, setUser] = useState(true);

    useEffect(() => {
        async function getUserDetails(){
            setError(false);
            toggleLoading(true);

            //fix!
            const id = 1;
            let url = `/api/v1/customer/${id}`;

            console.log(url);

            try {
                const result = await axios.get(url, {
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                })
                if(result.data !== "") {
                    setUser(result.data);
                }

            }catch(e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
            }
            toggleLoading(false);
        }
        getUserDetails()
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Jouw gegevens</h1>
                    <p>Onderstaande gegevens zijn bij ons bekend in het systeem.</p>
                    {error && <p className="errorContainer">{error}</p>}
                    {loading ? <LoadingIndicator /> : <UserInfo users={user}  />}
                </div>
            </div>
        </>
    )
}

export default UserSettingsPage;