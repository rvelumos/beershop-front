import React from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";

const UserProfilePage = () => {

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Welkom op jouw profiel</h1>
                    <p>Je kunt in het menu je orders vinden, maar ook kan je je gegevens inzien/aanpassen en jouw aangeschafte cadeaubonnen verzilveren </p>
                </div>
            </div>
        </>
    )
}

export default UserProfilePage;