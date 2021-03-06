import React, { useState } from 'react';
import './App.css';
import {
    Switch,
    Route,
} from 'react-router-dom';

import Layout from "./Templates/Layout";
import CMSLayout from "./Templates/CMSLayout";
import Login from "./Components/Website/UserProfile/Login/Login";
import ScrollToTop from "./Components/Website/Navigation/ScrollToTop/ScrollToTop";

function App() {
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);
    const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
    const [isManufacturerAuthenticated, setManufacturerAuthenticated] = useState(false);
    const [cmsLogin, setCmsLogin] = useState(false);
    const [token, setToken] = useState('');
    const [shoppingCartItems, setShoppingCartItems] = useState("");
    const [mode, setMode] = useState("init");

    const getAuthorities = () => {
        setMode("authorizing");
        if (localStorage.getItem('user_roles') !== null) {
            const token = localStorage.getItem('user_token');
            setToken(token);

            let role = localStorage.getItem('user_roles');
            role = JSON.parse(role);
            const authRole = role[0].authority;

            if (authRole === 'ROLE_ADMIN') setAdminAuthenticated(true);
            if (authRole === 'ROLE_MANUFACTURER') setManufacturerAuthenticated(true);
            if (authRole === 'ROLE_CUSTOMER') setUserAuthenticated(true);
        }
    }

    if(mode==='init')
        getAuthorities();

    return (
        <>
            <ScrollToTop />
            <div className="App">
                <Switch>
                    <Route path="/cms">
                        {isAdminAuthenticated || isManufacturerAuthenticated ?
                            <CMSLayout
                                authorityAdmin={isAdminAuthenticated}
                                authorityManufacturer={isManufacturerAuthenticated}
                                token={token}
                            />
                         : <Login
                                cmsLogin={cmsLogin}
                                setCmsLogin={setCmsLogin}
                                loginDefaultLandingPage="cmsProfile"
                                redirectUrl="/cms" />  }
                    </Route>

                    <Route path="/">
                        <Layout
                            userLoggedIn={isUserAuthenticated}
                            shoppingCartItems={shoppingCartItems}
                            setShoppingCartItems={setShoppingCartItems}
                            token={token}
                            redirectUrl="/mijn_account"
                        />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default App;
