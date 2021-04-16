import React from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";

const UserSettingsPage = () => {

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Jouw gegevens</h1>
                    <p>Onderstaande gegevens zijn bnij ons bekend in het systeem.</p>
                </div>
            </div>
        </>
    )
}

export default UserSettingsPage;