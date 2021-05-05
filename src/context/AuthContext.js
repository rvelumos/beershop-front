import React, {useState, createContext, useEffect} from 'react';
//import jwt_decode from 'jwt-decode';
import axios from "axios";
import LoadingIndicator from "../Components/Website/UI/LoadingIndicator/LoadingIndicator";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [userdata, setUserdata] = useState({
        user: null,
        status: 'pending'
    });

    useEffect(() => {
        const token = localStorage.getItem('user_token');

        if(token !== null && userdata.user === undefined) {
            fetchUserData(token);
            console.log('de token bij inlog is ' + token);
        } else {
            setUserdata({
                user: null,
                status: 'done'
            })
        }
    // eslint-disable-next-line
    }, [])

    async function loginUser(jwtToken) {
        console.log("token opgehaald loginUser: ");
        console.log(jwtToken);

        fetchUserData(jwtToken);

        localStorage.setItem('user_token', jwtToken);
    }

    async function fetchUserData(jwtToken) {
        //const decoded = jwt_decode(jwtToken);
        //const userId = decoded.sub;
        try {
            const result = await axios.get(`http://localhost:8080/authenticated/`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            console.log(result);
            localStorage.setItem('user_roles', JSON.stringify(result.data.authorities));
            setUserdata({
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id
                },
                status: 'done'
            })
            // history.push('/mijn_account/');
            setTimeout(function () {
                window.location.reload();
            }, 1000);

        } catch(e) {
            console.error(e);
        }
    }


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