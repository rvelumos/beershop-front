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
    const [mode, setMode] = useState("init");


    const getAuthorities = () => {
        setMode("authorizing");
        if (localStorage.getItem('user_token') !== null) {
            const token = localStorage.getItem('user_token');
            setToken(token);

            let role = localStorage.getItem('user_roles');
            role = JSON.parse(role);
            const auth_role = role[0].authority;

            if (auth_role === 'ROLE_ADMIN') setAdminAuthenticated(true);
            if (auth_role === 'ROLE_MANUFACTURER') setManufacturerAuthenticated(true);
            if (auth_role === 'ROLE_CUSTOMER') setUserAuthenticated(true);

        }
    }

    if(mode==='init')
        getAuthorities();

  //  if(token==='')
  //      setToken("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNjIwNTAyOTA3LCJpYXQiOjE2MTk2Mzg5MDd9.xiosF-d9YDXadq0O2uLjlJujoP4-UnuNNGyTfEojBBc");

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
