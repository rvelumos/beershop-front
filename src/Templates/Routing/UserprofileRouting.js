import React from "react";
import {Redirect, Route} from "react-router-dom";
import UserProfilePage from "../../Pages/User/UserProfilePage";
import Login from "../../Components/Website/UserProfile/Login/Login";
import UserOrderPage from "../../Pages/User/UserOrderPage";
import UserGiftPage from "../../Pages/User/UserGiftPage";
import UserBonusPage from "../../Pages/User/UserBonusPage";
import UserSettingsPage from "../../Pages/User/UserSettings";

const UserProfileRouting = ({userLoggedIn, token}) => {
    return (
        <>
            <Route path="/mijn_account/" exact>
                {userLoggedIn ?
                    <UserProfilePage />
                    : <Login/>
                }
            </Route>

            <Route path="/mijn_account/orders" exact>
                {userLoggedIn ?
                    <UserOrderPage token={token} />
                    : <Redirect to="/mijn_account/" />
                }
            </Route>

            <Route path="/mijn_account/gegevens" exact>
                {userLoggedIn ?
                    <UserSettingsPage token={token} />
                    : <Redirect to="/mijn_account/" />
                }
            </Route>

            <Route path="/mijn_account/cadeaubonnen" exact>
                {userLoggedIn ?
                    <UserGiftPage token={token} />
                    : <Redirect to="/mijn_account/" />
                }
            </Route>

            <Route path="/mijn_account/bonus">
                {userLoggedIn ?
                    <UserBonusPage />
                    : <Redirect to="/mijn_account/" />
                }
            </Route>
        </>
    )
}

export default UserProfileRouting;