import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import UserInfo from "./UserInfo/UserInfo";
import Error from "../../Website/UI/Feedback/Error/Error";
import axios from "axios";

const UserManagement = ({ token }) => {

    const [error, setError] = useState(false);
    const [users, setUsers] = useState("");
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        async function getUsers () {

            setError(false);
            toggleLoading(true);

            let url = "/api/v1/admin/customers";

            console.log(url);

            try {
                const result = await axios.get(url, {
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                })

                if (result.data !== ""){
                    setUsers(result.data);
                    toggleLoading(false);
                } else {
                   setUsers("");
                   setError("Geen resultaten");
                    toggleLoading(false);
                }

            }catch(e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
                toggleLoading(false);
            }
        }

        getUsers();

        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="overview">
                {loading ? <LoadingIndicator /> : <UserInfo users={users} error={error} token={token} setError={setError} />}
                {error && <Error type="message_container" content={error} /> }
            </div>
        </>
    )
}

export default UserManagement;