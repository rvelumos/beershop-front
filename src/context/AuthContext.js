import React, {useState, createContext, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import LoadingIndicator from "../Components/Website/UI/LoadingIndicator/LoadingIndicator";
import {useHistory} from "react-router";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [userdata, setUserdata] = useState({
        user: null,
        status: 'pending'
    });

    const history = useHistory();

    async function loginUser(jwtToken) {
        fetchUserData(jwtToken);

        localStorage.setItem('user_token', jwtToken);
    }

    async function fetchUserData(jwtToken) {
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;
        console.log(jwtToken);
        try {
            const result = await axios.get(`/api/v1/authenticated/`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            console.log(result);
            localStorage.setItem('user_roles', JSON.stringify(result.data.authorities));
            setUserdata({
                username: result.data.name,
                token: jwtToken,
                roles: result.data.authorities,
                status: 'done'
            })

            console.log("fetchUserdata inlog");
            history.push('/mijn_account');

        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('user_token');

        if(token !== null && userdata.username === undefined) {
            fetchUserData(token);
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