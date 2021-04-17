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
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);
    const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
    const [isManufacturerAuthenticated, setManufacturerAuthenticated] = useState(false);
    const [cmsLogin, setCmsLogin] = useState(false);
    const [token, setToken] = useState("");
    const [shoppingCartItems, setShoppingCartItems] = useState("");


    const getAuthorities = () => {
        if (localStorage.getItem('user') !== null) {
            const token = localStorage.getItem('user_token');
            const role = localStorage.getItem('user_role');

            console.log('de token in getAuthorities is:  ' + token);
            setToken(token);

            if (role === 'ROLE_ADMIN') setAdminAuthenticated(true);
            if (role === 'ROLE_MANUFACTURER') setManufacturerAuthenticated(true);
            if (role === 'ROLE_CUSTOMER') setUserAuthenticated(true);

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
