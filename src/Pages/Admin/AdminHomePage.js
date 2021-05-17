import React from 'react';

const AdminHomePage = ({username}) => {

    return (
        <>
            <div className="overview">
                <p className="cmsMainMessage">Welkom terug, {username}. Kies een optie uit het linkermenu.</p>
            </div>
        </>
    )
}

export default AdminHomePage;