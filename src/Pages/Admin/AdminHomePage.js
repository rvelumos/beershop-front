import React from 'react';

const AdminHomePage = ({username}) => {

    return (
        <>
            <div className="contentContainer">
                Welkom terug, {username}. Kies een optie uit het linkermenu.
            </div>
        </>
    )
}

export default AdminHomePage;