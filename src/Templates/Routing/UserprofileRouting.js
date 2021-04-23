import React from "react";
import {Redirect, Route} from "react-router-dom";
import UserProfilePage from "../../Pages/User/UserProfilePage";
import Login from "../../Components/Website/UserProfile/Login/Login";
import UserOrderPage from "../../Pages/User/UserOrderPage";
import UserGiftPage from "../../Pages/User/UserGiftPage";
import UserBonusPage from "../../Pages/User/UserBonusPage";

const UserProfileRouting = ({userLoggedIn}) => {
    return (
        <>
            <Route path="/mijn_account/" exact>
                {userLoggedIn ?
                    <UserProfilePage/>
                    : <Login/>
                }
            </Route>

            <Route path="/mijn_account/mijn_orders" exact>
                {userLoggedIn ?
                    <UserOrderPage/>
                    : <Redirect to="/mijn_account/"/>
                }
            </Route>

            <Route path="/mijn_account/orders" exact>
                {userLoggedIn ?
                    <UserOrderPage/>
                    : <Redirect to="/mijn_account/"/>
                }
            </Route>

            <Route path="/mijn_account/cadeaubonnen" exact>
                {userLoggedIn ?
                    <UserGiftPage/>
                    : <Redirect to="/mijn_account/"/>
                }
            </Route>

            <Route path="/mijn_account/bonus">
                {userLoggedIn ?
                    <UserBonusPage/>
                    : <Redirect to="/mijn_account/"/>
                }
            </Route>
        </>
    )
}

export default UserProfileRouting;