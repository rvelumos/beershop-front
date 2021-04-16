import React from 'react';
import Login from './Login/Login';
import UserProfilePage from "../../../Pages/User/UserProfilePage";

function UserProfile() {

    const checkAuthentication = () => {
        //const {username, password} = props;
        const userIsAuthenticated = false;

        if(userIsAuthenticated) {
            return (
                <UserProfilePage />
            );
        } else {
            return (
                <Login  />
            );
        }
    }
    return(
        <>
            {checkAuthentication()}
        </>
    )
}

export default UserProfile;