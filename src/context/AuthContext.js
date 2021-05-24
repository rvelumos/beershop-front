import React, {useState, createContext, useEffect} from 'react';
import axios from "axios";
import LoadingIndicator from "../Components/Website/UI/LoadingIndicator/LoadingIndicator";
import {useHistory} from "react-router";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [userdata, setUserdata] = useState({
        user: null,
        status: 'pending'
    });
    let history = useHistory();

    async function loginUser(jwtToken, loginDefaultLandingPage, orderItems, shoppingCartItems) {
        await FetchUserData(jwtToken, loginDefaultLandingPage, orderItems, shoppingCartItems);

        localStorage.setItem('user_token', jwtToken);
    }

    async function FetchUserData(jwtToken, loginDefaultLandingPage, orderItems, shoppingCartItems) {
        try {
            const result = await axios.get(`/api/v1/authenticated/`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                }
            })

            localStorage.setItem('user_roles', JSON.stringify(result.data.authorities));
            setUserdata({
                username: result.data.name,
                token: jwtToken,
                roles: result.data.authorities,
                status: 'done'
            })

            if(loginDefaultLandingPage==='userProfile') {
                history.push('/mijn_account');
                window.location.reload();
            } else if(loginDefaultLandingPage==='cmsProfile') {
                history.push('/cms');
                window.location.reload();
            } else if(loginDefaultLandingPage==='checkout') {
                history.push({
                    pathname: `/winkelwagen/checkout/stappen/`,
                    state: {
                        shoppingCartItems: shoppingCartItems,
                        orderItems: orderItems,
                        step: 2
                    }
                });
                window.location.reload();
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('user_token');

        if(token !== null && userdata.username === undefined) {
            FetchUserData(token);
        }
        setUserdata({
            status: 'done'
        })
        // eslint-disable-next-line
    }, [])


    function logoutUser() {
        localStorage.clear();
        setUserdata({
            user: null,
            status: 'done',
        })
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }

    const data = {
        ...userdata,
        login: loginUser,
        logout: logoutUser
    }

    return(
        <AuthContext.Provider value={data}>
            {userdata.status === 'done'
                ?   children
                :  <LoadingIndicator />
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;