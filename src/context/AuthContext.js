import React, {useState, createContext, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import LoadingIndicator from "../Components/Website/UI/LoadingIndicator/LoadingIndicator";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const history = useHistory();
    const [userdata, setUserdata] = useState({
        user: null,
        status: 'pending'
    });

    useEffect(() => {
        const token = localStorage.getItem('user_token');

        if(token !== null && userdata.user === null) {
            fetchUserData(token);
            console.log('de token is ' + token);
        } else {
            setUserdata({
                user: null,
                status: 'done'
            })
        }
    // eslint-disable-next-line
    }, [])

    async function loginUser(jwtToken) {
        console.log(jwtToken);

        fetchUserData(jwtToken);

        localStorage.setItem('token', jwtToken);
    }

    async function fetchUserData(jwtToken) {
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;
        try {
            const result = await axios.get(`http://localhost:8080/authenticated/`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            console.log(result);
            setUserdata({
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id
                },
                status: 'done'
            })
            history.push('/bla');

        } catch(e) {

        }
    }


    function logoutUser() {
        console.log('logout');
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