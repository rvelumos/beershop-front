import React, { useState } from 'react';
import './App.css';
import {
    Switch,
    Route,
} from 'react-router-dom';

import Layout from "./Templates/Layout";
import CMSLayout from "./Templates/CMSLayout";
import Login from "./Components/Website/UserProfile/Login/Login";

function App() {

    const [username, setUsername] = useState(false);
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);
    const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
    const [isManufacturerAuthenticated, setManufacturerAuthenticated] = useState(false);
    const [cmsLogin, setCmsLogin] = useState(false);
    const [token, setToken] = useState("");
    const [shoppingCartItems, setShoppingCartItems] = useState("");


    const getAuthorities = () => {
        if (localStorage.getItem('user') !== null) {
            const token = localStorage.getItem('user_token');

            console.log('de token in getAuthorities is:  ' + token);
            setToken(token);

            // if (user.data.authorities[0].authority === 'ROLE_ADMIN') setAdminAuthenticated(true);
            // if (user.data.authorities[0].authority === 'ROLE_MANUFACTURER') setManufacturerAuthenticated(true);
            // if (user.data.authorities[0].authority === 'ROLE_CUSTOMER') setUserAuthenticated(true);
        }
    }

    if(token==='')
        getAuthorities();

    console.log(isAdminAuthenticated);

    return (
        <>
            <div className="App">
                <Switch>
                    <Route path="/cms">

                        {isAdminAuthenticated || isManufacturerAuthenticated ?
                            <CMSLayout
                                authorityAdmin={isAdminAuthenticated}
                                authorityManufacturer={isManufacturerAuthenticated}
                                token={token}
                            />
                         : <Login cmsLogin={cmsLogin} setCmsLogin={setCmsLogin} redirectUrl="/cms" />  }
                    </Route>

                    <Route path="/">
                        <Layout
                            userLoggedIn={isUserAuthenticated}
                            shoppingCartItems={shoppingCartItems}
                            setShoppingCartItems={setShoppingCartItems}
                            redirectUrl="/mijn_account"
                        />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default App;
