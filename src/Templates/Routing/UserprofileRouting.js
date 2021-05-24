import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import UserProfilePage from "../../Pages/User/UserProfilePage";
import Login from "../../Components/Website/UserProfile/Login/Login";
import UserOrderPage from "../../Pages/User/UserOrderPage";
import UserGiftPage from "../../Pages/User/UserGiftPage";
import UserSettingsPage from "../../Pages/User/UserSettings";
import {AuthContext} from "../../context/AuthContext";
import EditForm from "../../Components/Website/Forms/EditForm/EditForm";

const UserProfileRouting = ({userLoggedIn}) => {

    const { token, username } = useContext(AuthContext);

    return (
        <>
            <Route path="/mijn_account/" exact>
                {userLoggedIn ?
                    <UserProfilePage username={username} />
                    : <Login loginDefaultLandingPage="userProfile" />
                }
            </Route>

            {userLoggedIn ?
                <>
                <Route path="/mijn_account/orders" exact>
                    <UserOrderPage token={token} />
                </Route>

                <Route path="/mijn_account/orders/:id" exact>
                    <UserOrderPage token={token} showDetails={true} />
                </Route>

                <Route path="/mijn_account/orders/generate_pdf/:id" exact>
                    {/*<PDFCreator section="orders" />*/}
                </Route>

                <Route path="/mijn_account/gegevens" exact>
                    <UserSettingsPage token={token} username={username} />
                </Route>

                <Route path="/mijn_account/gegevens/edit" exact>
                    <EditForm token={token} username={username} />
                </Route>

                <Route path="/mijn_account/cadeaubonnen" exact>
                    <UserGiftPage token={token} />
                </Route>
                </>
            : <Redirect to="/mijn_account/" />}

        </>
    )
}

export default UserProfileRouting;